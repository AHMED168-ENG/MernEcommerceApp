import tbl_cart from '../../model/cart';
import tbl_order from '../../model/orders';
import { Others } from '../../helper/helper';
import { CartType } from '../../types/cart';
import ProductService from '../product/product.services';
import { Schema } from 'mongoose';
import CouponService from '../coupon/coupon.services';
import buildError from '../../helper/ErrorBuilder';
import uniqid from "uniqid"
import tbl_product from '../../model/product';

type productCart =  {
    product_id : Schema.Types.ObjectId,
    count : number,
    color : string,
}

export default class CartService {

    public async cartOperation(product : productCart , userId:string) : Promise<CartType> {
        let cart : CartType = await this.findOne(userId)
        if(!cart) { 
            return this.createCart(product , userId)
        } else {
            return this.addProductToCart(cart , product , userId)
        }
    }
    
    private async createCart(product : productCart , userId : string) {
        let productsPrice = await this.getTotalPrice(product)
        return await tbl_cart.create({
            products : [product],
            total_price : productsPrice.totalPrice,
            price_after_discount : productsPrice.totalPriceAfterDiscount,
            user_id:userId
        })
    }
    
    private async addProductToCart(cart : CartType , product : productCart , userId:string) {
        // if product in cart
        if(cart.products.find(ele => ele.product_id == product.product_id)) {
            let newProducts = cart.products.map(ele => {
                if(ele.product_id == product.product_id) {
                    ele.count += product.count
                }
                return ele
            })
            let productsPrice = await this.getTotalPrice(newProducts)
            return await this.updateOne({_id:cart.id , user_id : userId} , {
                $set : {
                    products : newProducts,
                    total_price : productsPrice.totalPrice,
                    price_after_discount : productsPrice.totalPriceAfterDiscount,
                }
            })
        }
        // if product not in cart
        let newCart = {}
        let products = cart.products
        products.push(product)
        let productsPrice = await this.getTotalPrice(products)
        newCart = {
            products : products,
            total_price : productsPrice.totalPrice,
            price_after_discount : productsPrice.totalPriceAfterDiscount,
            user_id:userId
        }
        return await this.updateOne({_id:cart.id , user_id : userId }, {$set : newCart})
    }

    public async removeProductFromCart(productId : string , user_id:string) : Promise<CartType> {
        let cart : CartType = await this.findWithQuery({user_id})
        if(!cart) throw new Error("this product not belong to you")
        if(cart.products.length == 1) {
            await this.deleteOne(cart.id , user_id)
        } else {
            let newProducts = cart.products.filter((ele : productCart) => ele.product_id.toString() != productId)
            let productsPrice = await this.getTotalPrice(newProducts)
            let newCart = {
                products : newProducts,
                total_price : productsPrice.totalPrice,
                price_after_discount : productsPrice.totalPriceAfterDiscount,
                user_id:user_id
            }
            cart = await this.updateOne({_id:cart.id} , {$set : newCart})
        }
        return cart
    }
    
    public async updateOne(query:any , body:any) : Promise<CartType> {
        const cart = await tbl_cart.findByIdAndUpdate(query  , body , {new : true})
        console.log(cart)
        return cart
    }
    
    public async updateCartCount(productId:string , userId : string , count:number) : Promise<CartType> {
        let cart : CartType = await this.findOne(userId)
        if(!cart) throw new Error("this product not belong to you")
        cart.products = cart.products.map(ele => {
            if(ele.product_id.toString() == productId) {
                ele.count = count
            }
            return ele
        })
        let productPrice = await this.getTotalPrice(cart.products)
        cart = await this.updateOne({_id:cart.id , user_id : userId} , {$set : {
            products : cart.products,
            total_price : productPrice.totalPrice,
            price_after_discount : productPrice.totalPriceAfterDiscount,
        }})
        return cart
    }
    
    public async find(query : any) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newSort = await others.sortDocs(sort)
        const carts  = await tbl_cart.paginate({limit , page, sort : newSort }) 
        return carts 
    }
    
    public async findOne(user_id:string) : Promise<CartType> {
        const cart = await tbl_cart.findOne({user_id })
        return cart
    }
    
    public async findOneWithPopulate(user_id:string) : Promise<CartType> {
        const cart = await this.findOne(user_id)
        let productPrice = await this.getTotalPrice(cart.products)
        return await tbl_cart.findOneAndUpdate({user_id} , {
            products : cart.products,
            total_price : productPrice.totalPrice,
            price_after_discount : productPrice.totalPriceAfterDiscount,
        } , {new : true}).populate([{path : "products.product_id" , populate : {path : "category"}}])
    }

    public async findWithQuery(query: any ) : Promise<CartType> {
        const cart = await tbl_cart.findOne(query)
        return cart
    }
    
    public async deleteOne(_id:string , userId :string) {
        const cart = await tbl_cart.deleteOne({_id , userId })
        return cart
    }
    
    public async getTotalPrice(product : any) {
        let products = !Array.isArray(product) ? [product] : product
        const productService = new ProductService()
        const productsId = products.map(ele => ele.product_id)
        const productsData = await productService.findAllWithQuery({_id: {$in : productsId}})
        let totalPrice = 0
        let totalPriceAfterDiscount = 0
        productsData.forEach(element => {
            let quantity = products.find(ele => ele.product_id == element.id).count
            let priceForCount = element.price * quantity
            totalPrice += priceForCount
            if(element.discount_type == "amount") { 
                totalPriceAfterDiscount += (priceForCount - (element.discount * quantity))
            } else {
                let discountAsAmount = (element.discount / 100) * priceForCount
                totalPriceAfterDiscount += (priceForCount - discountAsAmount) 
            }
        });
        return {
            totalPriceAfterDiscount,
            totalPrice
        }
    }
    
    public async useCouponInCart(user_id : string , coupon : string) {
        const couponService = new CouponService()
        const couponData = await couponService.findOne(coupon)
        if(!couponData) throw buildError(404 , "this coupon not existed")
        let cart : CartType = await this.findOne(user_id)
        if(!cart) throw buildError(404 , "you do not have eny carts")
        let coupon_discount = couponData.discount
        if(couponData.discount_type == "percentage") {
            coupon_discount = (couponData.discount * 100 ) / cart.total_price
        }
        cart = await this.updateOne({_id:cart.id , user_id} , {$set : {
            products : cart.products,
            total_price : cart.total_price,                      
            price_after_discount : (cart.price_after_discount - coupon_discount),
        }})
        await couponService.updateOne(coupon , {$inc : {count : -1}})
        return cart
    }

    public async createOrder(user_id : string , COD : boolean) {
        if(!COD) throw buildError(403 , "Create cash order failed")
        const cart : CartType = await this.findOne(user_id)
        if(!cart) throw buildError(404 , "you do not have cart")
        const order = await tbl_order.create({
            products : cart.products,
            payment_intent : {
                id : uniqid(),
                method : "COD",
                amount : cart.price_after_discount ?? cart.total_price,
                status : "Cash On Delivery",
                created : Date.now(),
                currency : "usd"
            },
            order_status : "Cash On Delivery" ,
            ordered_by : user_id
        })
        const bulkWrite = []
        cart.products.forEach(ele => {
            bulkWrite.push({updateOne : {
                filter : {_id : ele.product_id},
                update : {$inc : {sold : 1 , quantity : -1}}
            }})
        })
        const productService = new ProductService()
        productService.bulkWrite(bulkWrite)
        return order
    }

    public async getAllOrder(user_id : string) {
        return await tbl_order.find({
            ordered_by : user_id    
        }).populate("products.product_id")
    }

    public async getOrder(user_id : string , _id:string) {
        return await tbl_order.findOne({
            ordered_by : user_id,
            _id
        }).populate("products.product_id")
    }

    public async changeOrderStatus(_id : string , order_status:string , userId: string) {
        return await tbl_order.findByIdAndUpdate({
            _id,
            ordered_by:userId
        } , {order_status}).populate("products.product_id")
    }
}
