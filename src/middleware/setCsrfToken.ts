import { NextFunction , Request , Response } from "express";
import httpStatus from "http-status";


export default function setCsrfToken (req : Request , res : Response , next : NextFunction) {
    res.locals.csrfToken = req.csrfToken
}

