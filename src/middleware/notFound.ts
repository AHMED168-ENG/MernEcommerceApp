import { NextFunction , Request , Response } from "express";
import httpStatus from "http-status";


export default function notFoundRoute (req: Request, res: Response, next: NextFunction) {
    res.status(httpStatus.NOT_FOUND).json({
        message: "this route not exists",
        success: false,
    });
}