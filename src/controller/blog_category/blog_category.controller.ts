import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Others } from "../../helper/helper";
import BlogCategoryService from "../../services/blog_category/blog_category.services";
interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {}
}

export default class BlogCategoryController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc create blogCategory 
     * @route /blogCategory/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const blogCategoryService : BlogCategoryService = new BlogCategoryService()
            // const others : Others = new Others()
            // body.slug = await others.makeSlug(body.title)
            const blogCategory = await blogCategoryService.create(body)
            return res.status(httpStatus.CREATED).json({
                blogCategory,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all blogCategory
     * @route /blogCategory/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const blogCategoryService : BlogCategoryService = new BlogCategoryService()
            const blogCategory = await blogCategoryService.find(query , ["title"])
            return res.status(httpStatus.OK).json({
                blogCategory,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find blogCategory
     * @route /blogCategory/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const blogCategoryService : BlogCategoryService = new BlogCategoryService()
            const blogCategory = await blogCategoryService.findOne(id)
            return res.status(httpStatus.OK).json({
                blogCategory : blogCategory ?? null,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update blogCategory
     * @route /blogCategory/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            // const others : Others = new Others()
            // body.slug = await others.makeSlug(body.title)
            const blogCategoryService : BlogCategoryService = new BlogCategoryService()
            const blogCategory = await blogCategoryService.updateOne(id , body)
            return res.status(httpStatus.OK).json({
                blogCategory,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete blogCategory
     * @route /blogCategory/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const blogCategoryService : BlogCategoryService = new BlogCategoryService()
            await blogCategoryService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc activation blogCategory
     * @route /blogCategory/activation-blogCategory
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async activationBlogCategory(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const blogCategoryService : BlogCategoryService = new BlogCategoryService()
            let blogCategory = await blogCategoryService.findOne(id)
            console.log(blogCategory)
            blogCategory = await blogCategoryService.activation(id , {active : !blogCategory.active})
            return res.status(httpStatus.OK).json({
                success : true,
                blogCategory
            })
        } catch (error) {
            next(error)
        }
    }
}