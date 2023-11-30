import { Router , Request , Response } from "express";
import UserController from "../../controller/user/user.controller";
import AuthUserController from "../../controller/auth/authUser.controller";
import UserValidation from "../../validations/users/user.validation";
import handel_validation_errors from "../../middleware/handelBodyError";
import UserAuth from "../../middleware/auth/userAuth";


class AuthUserRouter {
    public router : Router
    private readonly authUserController : AuthUserController = new AuthUserController()
    private readonly userValidation : UserValidation = new UserValidation()
    private readonly userAuth : UserAuth
    constructor() {
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }
    private Routes() {
        this.router.post(
            "/register" , 
            this.userValidation.createUser(),
            handel_validation_errors,
            this.authUserController.register)

        this.router.post(
            "/login" , 
            this.userValidation.loginUser(),
            handel_validation_errors,
            this.authUserController.login)

        this.router.put(
            "/update-password" , 
            this.userAuth.Auth,
            this.userValidation.resetPassword(),
            handel_validation_errors,
            this.authUserController.updatePassword)

        this.router.post(
            "/forget-password", 
            this.userValidation.forgetPassword(),
            handel_validation_errors,
            this.authUserController.forgetPassword)
        this.router.post(
            "/reset-password", 
            this.userValidation.resetPassword(),
            handel_validation_errors,
            this.authUserController.resetPassword)
    }
}

export default AuthUserRouter

