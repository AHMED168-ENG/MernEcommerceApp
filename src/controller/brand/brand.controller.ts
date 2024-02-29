import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Others } from "../../helper/helper";
import brandService from "../../services/blog_category/blog_category.services";
import BrandService from "../../services/brand/brand.services";
interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {}
}

export default class BrandController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc create brand 
     * @route /brand/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const brandService : BrandService = new BrandService()
            // const others : Others = new Others()
            // body.slug = await others.makeSlug(body.title)
            const brand = await brandService.create(body)
            return res.status(httpStatus.CREATED).json(brand)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all brand
     * @route /brand/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const brandService : BrandService = new BrandService()
            const brand = await brandService.find(query , ["title"])
            return res.status(httpStatus.OK).json(brand)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find brand
     * @route /brand/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const brandService : BrandService = new BrandService()
            const brand = await brandService.findOne(id)
            return res.status(httpStatus.OK).json(brand)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update brand
     * @route /brand/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            // const others : Others = new Others()
            // body.slug = await others.makeSlug(body.title)
            const brandService : BrandService = new BrandService()
            const brand = await brandService.updateOne(id , body)
            return res.status(httpStatus.OK).json(brand)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete brand
     * @route /brand/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const brandService : BrandService = new BrandService()
            await brandService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc activation brand
     * @route /brand/activation-brand
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async activationBrand(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const brandService : BrandService = new BrandService()
            let brand = await brandService.findOne(id)
            console.log(brand)
            brand = await brandService.activation(id , {active : !brand.active})
            return res.status(httpStatus.OK).json(brand)
        } catch (error) {
            next(error)
        }
    }
}