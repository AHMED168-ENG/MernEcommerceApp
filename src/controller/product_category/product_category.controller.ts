import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Others } from "../../helper/helper";
import ProductCategoryService from "../../services/product_category/product_category.services";
interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {}
}

export default class ProductCategoryController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc create productCategory 
     * @route /productCategory/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const productCategoryService : ProductCategoryService = new ProductCategoryService()
            const others : Others = new Others()
            body.slug = await others.makeSlug(body.title)
            const productCategory = await productCategoryService.create(body)
            return res.status(httpStatus.CREATED).json(productCategory)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all productCategory
     * @route /productCategory/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const productCategoryService : ProductCategoryService = new ProductCategoryService()
            const productCategory = await productCategoryService.find(query , ["title" , "brand"])
            return res.status(httpStatus.OK).json(productCategory)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find productCategory
     * @route /productCategory/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const productCategoryService : ProductCategoryService = new ProductCategoryService()
            const productCategory = await productCategoryService.findOne(id)
            return res.status(httpStatus.OK).json(productCategory)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update productCategory
     * @route /productCategory/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            const others : Others = new Others()
            body.slug = await others.makeSlug(body.title)
            const productCategoryService : ProductCategoryService = new ProductCategoryService()
            const productCategory = await productCategoryService.updateOne(id , body)
            return res.status(httpStatus.OK).json(productCategory)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete productCategory
     * @route /productCategory/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const productCategoryService : ProductCategoryService = new ProductCategoryService()
            await productCategoryService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc activation productCategory
     * @route /productCategory/activation-productCategory
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async activationProductCategory(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const productCategoryService : ProductCategoryService = new ProductCategoryService()
            let productCategory = await productCategoryService.findOne(id)
            productCategory = await productCategoryService.activation(id , {active : !productCategory.active})
            return res.status(httpStatus.OK).json(productCategory)
        } catch (error) {
            next(error)
        }
    }
}