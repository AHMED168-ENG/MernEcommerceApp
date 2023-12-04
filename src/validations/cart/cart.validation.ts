import { check , query } from "express-validator";
import { isValidObjectId } from "mongoose";


export default class CartValidation {
    private productId() {
        return check("product.product_id").notEmpty().withMessage("enter product id please").custom(async(val , {req}) => {
            if(!isValidObjectId(val)) return Promise.reject("this field accept object id")
            return true
        })
    }
    
    private count() {
        return check("product.count").notEmpty().withMessage("enter product count please").isNumeric().withMessage("this field accept number")
    }

    private color() {
        return check("product.color").notEmpty().withMessage("enter product color please")
    }

    public addToCart() {
        return [
            this.productId(),
            this.count(),
            this.color()
        ]
    }

    
    public updateCartCount() {
        return [
            this.count()
        ]
    }
}