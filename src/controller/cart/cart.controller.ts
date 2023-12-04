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

}