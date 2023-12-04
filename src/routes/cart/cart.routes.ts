import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import cartController from "../../controller/cart/cart.controller";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import cartValidation from "../../validations/cart/cart.validation";
import { ImageOperations } from "../../helper/helper";
import CartValidation from "../../validations/cart/cart.validation";
import CartController from "../../controller/cart/cart.controller";

export default class CartRouter {
    public router : Router
    private readonly cartValidation : CartValidation
    private readonly cartController : CartController
    private readonly userAuth : UserAuth
    constructor() {
        this.cartValidation = new CartValidation()
        this.cartController = new CartController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/add-to-cart" , 
            this.userAuth.Auth,
            this.userAuth.permission(["user" , "admin"]),
            this.cartValidation.addToCart(),
            handel_validation_errors,
            this.cartController.addToCart
        )

        this.router.delete(
            "/remove-product-cart/:product_id" , 
            this.userAuth.Auth,
            this.userAuth.permission(["user" , "admin"]),
            this.cartController.removeFromCart
        )

        this.router.put(
            "/change-product-count/:product_id" , 
            this.userAuth.Auth,
            this.userAuth.permission(["user" , "admin"]),
            this.cartValidation.updateCartCount(),
            handel_validation_errors,
            this.cartController.updateCartCount
        )

        this.router.get(
            "/my-cart" , 
            this.userAuth.Auth,
            this.userAuth.permission(["user" , "admin"]),
            this.cartController.findOneWithPopulate
        )
    }

}