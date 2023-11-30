import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import CouponService from "../../services/coupon/coupon.services";

interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {}
}

export default class couponController {
    constructor() {}
    
    /** ------------------------------------------------------  
     * @desc create  
     * @route /coupon/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const couponService : CouponService = new CouponService()
            const coupon = await couponService.create(body)
            return res.status(httpStatus.CREATED).json({
                coupon,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all coupon
     * @route /coupon/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const couponService : CouponService = new CouponService()
            const coupon = await couponService.find(query , ["name"])
            return res.status(httpStatus.OK).json({
                coupon,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find coupon
     * @route /coupon/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const couponService : CouponService = new CouponService()
            const coupon = await couponService.findOne(id)
            return res.status(httpStatus.OK).json({
                coupon,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update coupon
     * @route /coupon/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            // const others : Others = new Others()
            // body.slug = await others.makeSlug(body.title)
            const couponService : CouponService = new CouponService()
            const coupon = await couponService.updateOne(id , body)
            return res.status(httpStatus.OK).json({
                coupon,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete coupon
     * @route /coupon/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const couponService : CouponService = new CouponService()
            await couponService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

}