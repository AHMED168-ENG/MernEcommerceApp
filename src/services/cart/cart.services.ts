import tbl_cart from '../../model/cart';
import { Others } from '../../helper/helper';
import { CartType } from '../../types/cart';
import ProductService from '../product/product.services';
import { Schema } from 'mongoose';

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
        return (await this.updateOne({user_id} , {
            products : cart.products,
            total_price : productPrice.totalPrice,
            price_after_discount : productPrice.totalPriceAfterDiscount,
        })).populate([{path : "products.product_id" , select: "name _id price description category" , populate : {path : "category"}}])
    }

    public async findWithQuery(query: any ) : Promise<CartType> {
        const cart = await tbl_cart.findOne(query)
        return cart
    }
    
    public async deleteOne(_id:string , userId :string) {
        const cart = await tbl_cart.deleteOne({_id })
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
                totalPriceAfterDiscount += (priceForCount - element.discount)
            } else {
                let discountAsAmount = (priceForCount / 100) * element.discount
                totalPriceAfterDiscount += (priceForCount - discountAsAmount)
            }
        });
        return {
            totalPriceAfterDiscount,
            totalPrice
        }
    }

}
