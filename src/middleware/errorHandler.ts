import { NextFunction , Request , Response } from "express";
import httpStatus from "http-status";
import Logging from "../config/logging.config";


export default function errorHandler (error: any, req: Request, res: Response, next: NextFunction)  {
    const logging : Logging = new Logging();
    logging.loggerOperationError().error(error.message);
    res.status(error.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    success: false,
    stack:
        process.env.NODE_SERVER_ENV == "production" ? null : error.stack,
    });
    console.log(error)
}

