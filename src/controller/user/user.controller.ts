import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import UserService from "../../services/user/users.services";
import httpStatus from "http-status";
import { Config } from "../../config/config";
import buildError from '../../helper/ErrorBuilder';
interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {id:string}
}

export default class UserController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc create user 
     * @route /user/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : Request , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const userService : UserService = new UserService()
            const user = await userService.create({...body , active :true})
            return res.status(httpStatus.CREATED).json(user)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all users
     * @route /user/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : Request , res : Response , next : NextFunction) {
        try {
            const {limit , page} = req.query
            const userService : UserService = new UserService()
            const users = await userService.find(+limit , +page)
            return res.status(httpStatus.OK).json(users)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find user WishList
     * @route /user/find WishList
     * @method get
     * @access private user
     /**  ------------------------------------------------------  */
    public async findWishList(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.user
            const userService : UserService = new UserService()
            const users = await userService.findWishList(id)
            return res.status(httpStatus.OK).json(users)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find user
     * @route /user/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOne(req : Request , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userService : UserService = new UserService()
            const user = await userService.findOne(id)
            return res.status(httpStatus.OK).json(user)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update user
     * @route /user/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : Request , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            const userService : UserService = new UserService()
            const user = await userService.updateOne(id , body)
            return res.status(httpStatus.OK).json(user)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update user profile
     * @route /user/update one
     * @method put
     * @access private user 
     /**  ------------------------------------------------------  */
    public async updateProfile(req : any , res : Response , next : NextFunction) {
        try {
            const {id} = req.user
            const {body} = req
            const userService : UserService = new UserService()
            const user = await userService.updateOne(id , body)
            return res.status(httpStatus.OK).json(user)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete user
     * @route /user/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : Request , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userService : UserService = new UserService()
            await userService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc blocked user
     * @route /user/blocked-user
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async blockedUser(req : Request , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userService : UserService = new UserService()
            let user = await userService.findOne(id)
            await userService.updateOne(id , {isBlocked : !user.isBlocked})
            return res.status(httpStatus.OK).json(user)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc active my account
     * @route /user/active-my-account
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async activeMyAccount(req : Request , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userService : UserService = new UserService()
            let user = await userService.activeMyAccount(id)
            return res.status(httpStatus.OK).json(user)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc refresh user token
     * @route /user/refresh user token
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async refreshToken(req : Request , res : Response , next : NextFunction) {
        try {
            const userService : UserService = new UserService()
            const cookies = req.cookies
            if(!cookies?.refreshToken) throw buildError(httpStatus.UNAUTHORIZED , "refresh token not found" ) 
            const user = await userService.findWithQuery({refreshToken : cookies.refreshToken})
                if(!user) throw buildError(httpStatus.UNAUTHORIZED , "there is no user with this token") 
                else {
                    jwt.verify(cookies?.refreshToken , Config.SECRET_KEY , async(error , decode : any) => {
                        if((error?.name == "TokenExpiredError" || decode.id != user[0].id)) throw buildError(httpStatus.UNAUTHORIZED , "error with token")
                        else {
                            return res.status(httpStatus.OK).json({
                                success: false,
                                token : await userService.generateToken(user[0].id)
                            });
                        }
                    
                    })
                }
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc logout user
     * @route /user/logout
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async logout(req : Request , res : Response , next : NextFunction) {
        try {
            res.clearCookie("refreshToken")
        } catch (error) {
            next(error)
        }
    }


}