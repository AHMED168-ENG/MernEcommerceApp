import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ColorService from "../../services/color/color.services";

interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {}
}

export default class ColorController {
    constructor() {}
    
    /** ------------------------------------------------------  
     * @desc create  
     * @route /color/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const colorService : ColorService = new ColorService()
            const color = await colorService.create(body)
            return res.status(httpStatus.CREATED).json({
                color,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all color
     * @route /color/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const colorService : ColorService = new ColorService()
            const color = await colorService.find(query , ["name"])
            return res.status(httpStatus.OK).json({
                color,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find color
     * @route /color/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const colorService : ColorService = new ColorService()
            const color = await colorService.findOne(id)
            return res.status(httpStatus.OK).json({
                color,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update color
     * @route /color/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            // const others : Others = new Others()
            // body.slug = await others.makeSlug(body.title)
            const colorService : ColorService = new ColorService()
            const color = await colorService.updateOne(id , body)
            return res.status(httpStatus.OK).json({
                color,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete color
     * @route /color/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const colorService : ColorService = new ColorService()
            await colorService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

}