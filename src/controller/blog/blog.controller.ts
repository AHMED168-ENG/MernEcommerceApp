import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ImageOperations, Others } from "../../helper/helper";
import BlogService from "../../services/blog/blog.services";
interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user ?: {id:string}
}

export default class BlogController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc create blog 
     * @route /blog/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const blogService : BlogService = new BlogService()
            const others : Others = new Others()
            body.slug = await others.makeSlug(body.title)
            const blog = await blogService.create(body)
            return res.status(httpStatus.CREATED).json(blog)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all blogs
     * @route /blog/find all
     * @method get
     * @access private user admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const blogService : BlogService = new BlogService()
            const blogs = await blogService.find(query , ["title" , "brand"])
            return res.status(httpStatus.OK).json(blogs)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find blog
     * @route /blog/find one
     * @method get
     * @access private user admin
     /**  ------------------------------------------------------  */
    public async findOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const blogService : BlogService = new BlogService()
            const blog = await blogService.findOne(id)
            return res.status(httpStatus.OK).json({
                blog,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update blog
     * @route /blog/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            const others : Others = new Others()
            body.slug = await others.makeSlug(body.title)
            const blogService : BlogService = new BlogService()
            const blog = await blogService.updateOne(id , body)
            return res.status(httpStatus.OK).json(blog)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete blog
     * @route /blog/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const blogService : BlogService = new BlogService()
            await blogService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc change Blog Views 
     * @route /blog/change-blog-views
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async changeBlogViewNumber(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {blogsId} = req.body
            const {id} : any = req.user
            const blogService : BlogService = new BlogService()
            await blogService.changeBlogViews(blogsId , id)
            return res.status(httpStatus.OK).json({
                success : true,
            })
        } catch (error) {
            next(error)
        }
    }
    /** ------------------------------------------------------  
     * @desc likes and dislike
     * @route /blog/likes-and-dislike
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async likesAndDislike(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userId : any = req.user.id
            const {isLiked , isDisLiked} : any = req.body
            const blogService : BlogService = new BlogService()
            await blogService.likesAndDislike(id , isLiked , isDisLiked , userId)
            return res.status(httpStatus.OK).json({
                success : true,
            })
        } catch (error) {
            next(error)
        }
    }

    
    /** ------------------------------------------------------  
     * @desc activation blog
     * @route /blog/activation-blog/:id
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
     public async activationBlog(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const blogService : BlogService = new BlogService()
            let blog = await blogService.findOne(id)
            let newBlog = await blogService.activation(id , {active : !blog.active})
            return res.status(httpStatus.OK).json(newBlog)
        } catch (error) {
            next(error)
        }
    }
    
    /** ------------------------------------------------------  
     * @desc upload blog images
     * @route /blog/upload-image/:id
     * @method post
     * @access private all
     /**  ------------------------------------------------------  */
     public async uploadImage(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {files} = req
            const {width , height} = req.body
            const blogService : BlogService = new BlogService()
            let blog = await blogService.uploadImage(files , {width , height} , id)
           return res.status(httpStatus.OK).json(blog)
        } catch (error) {
            next(error)
        }
    }
}



