import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ProductCommentService from "../../services/product_comment/product_comment.services";
interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
    },
    user : {id : string}
}

export default class ProductCommentController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc create productComment 
     * @route /product-comment/create
     * @method post
     * @access private user
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const id = req.user.id
            const productCommentService : ProductCommentService = new ProductCommentService()
            const productComment = await productCommentService.create({...body , user_id : id})
            return res.status(httpStatus.CREATED).json({
                productComment,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all product comment
     * @route /product-comment/find all
     * @method get
     * @access private user
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const query = req.query
            const productCommentService : ProductCommentService = new ProductCommentService()
            const productComment = await productCommentService.find(id,query)
            return res.status(httpStatus.OK).json({
                productComment,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update product comment
     * @route /product-comment/update one
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            const userId = req.user.id
            const productCommentService : ProductCommentService = new ProductCommentService()
            const productComment = await productCommentService.updateOne(id , userId , body)
            return res.status(httpStatus.OK).json({
                productComment,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete product comment
     * @route /product-comment/delete one
     * @method delete
     * @access private user
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userId = req.user.id
            const productCommentService : ProductCommentService = new ProductCommentService()
            await productCommentService.deleteOne(id , userId)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc likes and dislike
     * @route /product comment/likes-and-dislike
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
     public async likesAndDislike(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userId : any = req.user.id
            const {isLiked , isDisLiked} : any = req.body
            const productCommentService : ProductCommentService = new ProductCommentService()
            let comment = await productCommentService.commentLike(id , isLiked , isDisLiked , userId)
            return res.status(httpStatus.OK).json({
                success : true,
                comment
            })
        } catch (error) {
            next(error)
        }
    }


}