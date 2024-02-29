import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import orderService from "../../services/order/order.services";
import OrderService from "../../services/order/order.services";

interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {}
}

export default class OrderController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc find all order
     * @route /order/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const orderService : orderService = new OrderService()
            const order = await orderService.find(query , ["order_status"] )
            return res.status(httpStatus.OK).json(order)
        } catch (error) {
            next(error)
        }
    }
}