import { check , query } from "express-validator";
import { isValidObjectId } from "mongoose";
import BlogService from "../../services/blog/blog.services";


export default class BlogValidation {
    private title(id?:boolean) {
        return check("title").notEmpty().withMessage("enter blog title please").custom(async(val , {req}) => {
            const blogService = new BlogService()
            let query : {title : string , _id? : {}} = {title : val}
            if(id) query._id = {$ne : req.params.id}
            const blog = await blogService.findWithQuery(query)
            if(blog) return Promise.reject("")
            return true
        }).withMessage("this blog title entered before").trim()
    }

    private description() {
        return check("description").notEmpty().withMessage("enter blog description please").trim()
    }

    private category() {
        return check("category").notEmpty().withMessage("enter blog category please")
        // .custom((val , {req}) => {
        //     if(!isValidObjectId(val)) throw new Error("")
        //     return true
        // }).withMessage("invalid category id").trim()
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

    public createBlog() {
        return [
            this.title(),
            this.description(),
            this.category(),
        ]
    }

    public updateBlog() {
        return [
            this.title(true),
            this.description(),
            this.category(),
        ]
    }
    public likesAndDislikes() {
        return [
           this.isLiked(),
           this.isDisLiked()
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
    
    public checkPaginationParams() {
        return [
           this.page(),
           this.limit()
        ]
    }
}