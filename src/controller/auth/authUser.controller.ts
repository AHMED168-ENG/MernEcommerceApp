import { NextFunction, Request, Response } from "express";
import UserService from "../../services/user/users.services";
import httpStatus from "http-status";
import AuthService from "../../services/auth/authUser";

interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {id : string}
}

export default class AuthUserController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc register user 
     * @route /auth
     * @method post
     * @access private register user
     /**  ------------------------------------------------------  */
    public async register(req : Request , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const authService : AuthService = new AuthService()
            const user = await authService.register(body)
            return res.status(httpStatus.CREATED).json({
                user : user,
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc login user 
     * @route /auth
     * @method post
     * @access private login user
     /**  ------------------------------------------------------  */
    public async login(req : Request , res : Response , next : NextFunction) {
        try {
            const {email , password} = req.body
            const userService : UserService = new UserService()
            let user : any = await userService.findWithEmail(email)
            if(user && user.comparePassword(password)) {
                let refreshToken = await userService.refreshToken(user._id)
                user = await userService.updateOne(user._id , {refreshToken : refreshToken})
                res.cookie("refreshToken" , refreshToken , {
                    httpOnly : true,
                    maxAge : 72 * 60 * 60 * 1000,
                })
                return res.status(httpStatus.OK).json({
                    success : true,
                    user,
                    token : await userService.generateToken(user._id)
                }) 
            } else {
                return res.status(httpStatus.FORBIDDEN).json({
                    message : "you not allowed to enter",
                    success : false
                })
            }
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc forget user password 
     * @route /auth
     * @method post
     * @access private forget user password 
     /**  ------------------------------------------------------  */
    public async forgetPassword(req : any , res : Response , next : NextFunction) {
        try {
            const {email} = req.body
            const authService : AuthService = new AuthService()
            let token = await authService.forgetPassword(email)
            return res.status(httpStatus.OK).send({success : true , token})
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc reset user password 
     * @route /auth
     * @method post
     * @access private forget user password 
     /**  ------------------------------------------------------  */
    public async resetPassword(req : any , res : Response , next : NextFunction) {
        try {
            const {token} = req.query
            const {password} = req.body
            const authService : AuthService = new AuthService()
            const user = await authService.resetPassword(password , token)
            return res.status(httpStatus.OK).send({success : true , user})
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update user password 
     * @route /auth
     * @method put
     * @access private reset user password 
     /**  ------------------------------------------------------  */
    public async updatePassword(req : any , res : Response , next : NextFunction) {
        try {
            const {id} = req.user
            const {password} = req.body
            let authService : AuthService = new AuthService()
            let user = await authService.updatePassword(password , id)
            return res.status(httpStatus.OK).send({
                success : true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
}