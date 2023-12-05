import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import CartService from "../../services/cart/cart.services";

interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {id:string}
}

export default class CartController {
    constructor() {}
    
    /** ------------------------------------------------------  
     * @desc create  
     * @route /cart/add/product
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async addToCart(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {product} = req.body
            const {id} = req.user       
            const cartService : CartService = new CartService()
            const cart = await cartService.cartOperation(product , id)
            return res.status(httpStatus.CREATED).json({
                cart,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }
    
    /** ------------------------------------------------------  
     * @desc remove  
     * @route /cart/remove/product
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async removeFromCart(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {product_id} = req.params 
            const {id} = req.user
            const cartService : CartService = new CartService()
            const cart = await cartService.removeProductFromCart(product_id , id)
            return res.status(httpStatus.CREATED).json({
                cart : cart.products.length == 1 || null,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find cart
     * @route /cart/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOneWithPopulate(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.user
            const cartService : CartService = new CartService()
            const cart = await cartService.findOneWithPopulate(id)
            return res.status(httpStatus.OK).json({
                cart,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update cart count
     * @route /cart/update cart count
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateCartCount(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {product_id} = req.params
            const userId = req.user.id
            const {count} = req.body.product
            const cartService : CartService = new CartService()
            const cart = await cartService.updateCartCount( product_id  , userId , count)
            return res.status(httpStatus.OK).json({
                cart,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete cart
     * @route /cart/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userId = req.user.id
            const cartService : CartService = new CartService()
            await cartService.deleteOne(id , userId)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc use coupon cart
     * @route /cart/coupon cart
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async useCouponInCart(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const userId = req.user.id
            const coupon = req.params.id
            const cartService : CartService = new CartService()
            const cart = await cartService.useCouponInCart(userId , coupon)
            return res.status(httpStatus.OK).json({
                success : true,
                cart
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc add order
     * @route /cart/add order
     * @method post
     * @access private user
     /**  ------------------------------------------------------  */
    public async createOrder(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const userId = req.user.id
            const {COD} = req.body
            const cartService : CartService = new CartService()
            const cart = await cartService.createOrder(userId , COD)
            return res.status(httpStatus.OK).json({
                success : true,
                cart
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc get all order
     * @route /cart/get all order
     * @method post
     * @access private user
     /**  ------------------------------------------------------  */
    public async getAllOrder(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const userId = req.user.id
            const cartService : CartService = new CartService()
            const orders = await cartService.getAllOrder(userId )
            return res.status(httpStatus.OK).json({
                success : true,
                orders
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc get order
     * @route /cart/get order
     * @method post
     * @access private user
     /**  ------------------------------------------------------  */
    public async getOrder(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const userId = req.user.id
            const {id} = req.params
            const cartService : CartService = new CartService()
            const order = await cartService.getOrder(userId , id)
            return res.status(httpStatus.OK).json({
                success : true,
                order
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc change Order Status
     * @route /cart/change order status
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async changeOrderStatus(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {order_status} = req.body
            const userId = req.user.id
            const {id} = req.params
            const cartService : CartService = new CartService()
            const order = await cartService.changeOrderStatus(id , order_status , userId)
            return res.status(httpStatus.OK).json({
                success : true,
                order
            })
        } catch (error) {
            next(error)
        }
    }

}