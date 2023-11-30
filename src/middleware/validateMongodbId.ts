import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { isValidObjectId } from "mongoose";




export default async function validateMongodbId(req : Request , res : Response , next : NextFunction) {
    try {
        const {id} = req.params;
        if(!isValidObjectId(id)) {
            res.status(httpStatus.NOT_FOUND).json({
                success : false,
                message : "invalid id"
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}
