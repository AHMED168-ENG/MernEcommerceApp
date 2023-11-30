import { check , query } from "express-validator";
import { isValidObjectId } from "mongoose";


export default class productCommentValidation {
    private comment() {
        return check("comment").notEmpty().withMessage("enter your comment please")
    }

    private product_id() {
        return check("product_id").custom(async(val , {req}) => {
            if(!isValidObjectId(val)) return Promise.reject("")
            return true
        }).withMessage("not valid product id").trim()
    }

    public createProductComment() {
        return [
            this.comment(),
            this.product_id(),
        ]
    }
    
    public updateProductComment() {
        return [
            this.comment(),
        ]
    }

    private page() {
        return query("page").isInt({ gt: 0 });
    }
    
    private limit() {
        return query("limit").isInt({ gt: 0 });
    }
    
    public checkPaginationParams() {
        return [
           this.page(),
           this.limit()
        ]
    }

    private isLiked() {
        return check("isLiked").notEmpty().withMessage("enter isLiked column in body").custom((value ) => {
            if(![true , false].includes(value)) throw new Error()
            return true
        }).withMessage("this field accept boolean value")
    }

    private isDisLiked() {
        return check("isDisLiked").notEmpty().withMessage("enter isDisLiked column in body").custom((value ) => {
            if(![true , false].includes(value)) throw new Error()
            return true
        }).withMessage("this field accept boolean value")
    }

    public likesAndDislikes() {
        return [
           this.isLiked(),
           this.isDisLiked()
        ]
    }
}