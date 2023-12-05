import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import EnqService from "../../services/enq/enq.services";

interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {}
}

export default class EnqController {
    constructor() {}
    
    /** ------------------------------------------------------  
     * @desc create  
     * @route /enq/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const enqService : EnqService = new EnqService()
            const enq = await enqService.create(body)
            return res.status(httpStatus.CREATED).json({
                enq,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all enq
     * @route /enq/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const enqService : EnqService = new EnqService()
            const enq = await enqService.find(query , ["name"])
            return res.status(httpStatus.OK).json({
                enq,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find enq
     * @route /enq/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const enqService : EnqService = new EnqService()
            const enq = await enqService.findOne(id)
            return res.status(httpStatus.OK).json({
                enq,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update enq
     * @route /enq/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            const enqService : EnqService = new EnqService()
            const enq = await enqService.updateOne(id , body)
            return res.status(httpStatus.OK).json({
                enq,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete enq
     * @route /enq/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const enqService : EnqService = new EnqService()
            await enqService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

}