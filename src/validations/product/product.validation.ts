import { check , query } from "express-validator";
import { isValidObjectId } from "mongoose";
import ProductService from "../../services/product/product.services";


export default class ProductValidation {
    private title(id?:boolean) {
        return check("title").notEmpty().withMessage("enter product title please").custom(async(val , {req}) => {
            const productService = new ProductService()
            let query : {title : string , _id? : {}} = {title : val}
            if(id) query._id = {$ne : req.params.id}
            const product = await productService.findWithQuery(query)
            if(product) return Promise.reject("")
            return true
        }).withMessage("this title entered before").trim()
    }

    private description() {
        return check("description").notEmpty().withMessage("enter product description please").trim()
    }

    private price() {
        return check("price").notEmpty().withMessage("enter product price please").trim()
    }

    private category() {
        return check("category").notEmpty().withMessage("enter product category please").custom((val , {req}) => {
            if(!isValidObjectId(val)) throw new Error("")
            return true
        }).withMessage("invalid category id").trim()
    }

    private quantity() {
        return check("price").notEmpty().withMessage("enter product quantity please").trim()
    }

    private brands() {
        return check("brands").custom((val , {req}) => {
            if(!val.length)  throw new Error("")
            return true
        }).withMessage("enter at lest on brands for product please").trim()
    }

    private colors() {
        return check("colors").custom((val , {req}) => {
            if(!val.length)  throw new Error("")
            return true
        }).withMessage("enter at lest on color for product please").trim()
    }

    public createProduct() {
        return [
            this.title(),
            this.price(),
            this.description(),
            this.category(),
            this.quantity(),
            this.brands(),
            this.colors(),
        ]
    }
    
    public updateProduct() {
        return [
            this.title(true),
            this.price(),
            this.description(),
            this.category(),
            this.quantity(),
            this.brands(),
            this.colors(),
        ]
    }

    private page() {
        return query("page").isInt({ gt: 0 });
    }
    
    private limit() {
        return query("limit").isInt({ gt: 0 });
    }
    
        
    private width() {
        return check("width").notEmpty().isNumeric()
    }
    
    private height() {
        return check("height").notEmpty().isNumeric()
    }

    public imageDimension() {
        return [this.width() , this.height()]
    }
    
    public start() {
        return check("start").notEmpty().withMessage("enter your rate");
    }
    
    public checkPaginationParams() {
        return [
           this.page(),
           this.limit()
        ]
    }

}