import { check , query } from "express-validator";
import { isValidObjectId } from "mongoose";
import ProductCategoryService from "../../services/product_category/product_category.services";


export default class ProductCategoryValidation {
    private title(id?:boolean) {
        return check("title").notEmpty().withMessage("enter product title please").custom(async(val , {req}) => {
            const productCategoryService = new ProductCategoryService()
            let query : {title : string , _id? : {}} = {title : val}
            if(id) query._id = {$ne : req.params.id}
            const productCategory = await productCategoryService.findWithQuery(query)
            if(productCategory) return Promise.reject("")
            return true
        }).withMessage("this product already exist").trim()
    }

    private parentId(id?:boolean) {
        return check("parentId").optional().custom(async(val , {req}) => {
            if(!isValidObjectId(val)) return Promise.reject("")
            return true
        }).withMessage("not valid id").trim()
    }

    

    public createProductCategory() {
        return [
            this.title(),
            this.parentId(),
        ]
    }
    public updateProductCategory() {
        return [
            this.title(true),
            this.parentId(),
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

}