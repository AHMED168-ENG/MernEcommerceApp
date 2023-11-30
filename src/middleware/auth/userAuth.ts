
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Config } from '../../config/config';
import UserService from '../../services/user/users.services';

export default class UserAuth {
    constructor(){}
    public Auth(req : any , res : Response , next : NextFunction) {
       try {
            let authorization = req.headers?.authorization
            let token = authorization?.split(" ")[1]
            if(!authorization || !token) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    success : false,
                    message : "you not authorized"
                })
            }
            jwt.verify(token , Config.SECRET_KEY , async(error , decode : any) => {
                if((error?.name == "TokenExpiredError")) {
                    return res.status(httpStatus.UNAUTHORIZED).json({
                        msg: "token expired",
                        success: false,
                    });
                } else {
                    const userService : UserService = new UserService()
                    let user = await userService.findOne(decode?.id)
                    req.user = user
                    return next()
                }
            
            })
       } catch (error) {
            next(error)
       }
    }
    public permission(permission : [string]) {
        return (req : any , res : Response , next : NextFunction) => {
            try {
                const user = req.user
                if(!permission.includes(user?.role)) {
                    return res.status(httpStatus.FORBIDDEN).json({
                        message : "you not allowed to access"
                    })
                }
                next()
            } catch (error) {
                next(error)
            }
        }
        
    }
}