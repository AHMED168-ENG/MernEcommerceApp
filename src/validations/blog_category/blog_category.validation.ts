import { check , query } from "express-validator";
import { isValidObjectId } from "mongoose";
import BlogCategoryService from "../../services/blog_category/blog_category.services";


export default class BlogCategoryValidation {
    private title(id?:boolean) {
        return check("title").notEmpty().withMessage("enter Category title please").custom(async(val , {req}) => {
            const blogCategoryService = new BlogCategoryService()
            let query : {title : string , _id? : {}} = {title : val}
            if(id) query._id = {$ne : req.params.id}
            const blogCategory = await blogCategoryService.findWithQuery(query)
            if(blogCategory) return Promise.reject("")
            return true
        }).withMessage("this category already exist").trim()
    }

    private parentId(id?:boolean) {
        return check("parentId").optional().custom(async(val , {req}) => {
            if(!isValidObjectId(val)) return Promise.reject("")
            return true
        }).withMessage("not valid id").trim()
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

    public createBlogCategory() {
        return [
            this.title(),
            this.parentId(),
        ]
    }
    
    public updateBlogCategory() {
        return [
            this.title(true),
            this.parentId(),
        ]
    }

    

}