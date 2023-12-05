import { check , query } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ORDER_STATUS } from "../../constant/product";


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

    private COD() {
        return check("COD").notEmpty().withMessage("enter COD ")
    }

    public orderStatus() {
        return check("order_status").notEmpty().withMessage("enter order_status").custom((value , {req}) => {
            if(!ORDER_STATUS.includes(value)) return Promise.reject("value should be one of " + ORDER_STATUS.join(" , "))
            return true
        })
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
    
    public addOrder() {
        return [
            this.COD()
        ]
    }
}