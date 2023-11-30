import { check , query } from "express-validator";
import { isValidObjectId } from "mongoose";
import brandService from "../../services/blog_category/blog_category.services";
import BrandService from "../../services/brand/brand.services";


export default class BrandValidation {
    private title(id?:boolean) {
        return check("title").notEmpty().withMessage("enter Category title please").custom(async(val , {req}) => {
            const brandService = new BrandService()
            let query : {title : string , _id? : {}} = {title : val}
            if(id) query._id = {$ne : req.params.id}
            const brand = await brandService.findWithQuery(query)
            if(brand) return Promise.reject("")
            return true
        }).withMessage("this category already exist").trim()
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

    public createBrand() {
        return [
            this.title(),
        ]
    }
    
    public updateBrand() {
        return [
            this.title(true),
        ]
    }

    

}