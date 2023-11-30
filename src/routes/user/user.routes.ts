import { Router } from "express";
import UserValidation from "../../validations/users/user.validation";
import handel_validation_errors from "../../middleware/handelBodyError";
import UserController from "../../controller/user/user.controller";
import UserAuth from "../../middleware/auth/userAuth";
import FilterBody from "../../middleware/filterBody";
import validateMongodbId from "../../middleware/validateMongodbId";

export default class UserRouter {
    public router : Router
    private readonly userValidation : UserValidation
    private readonly userController : UserController
    private readonly userAuth : UserAuth
    private readonly filterBody : FilterBody
    constructor() {
        this.userValidation = new UserValidation()
        this.userController = new UserController()
        this.userAuth = new UserAuth()
        this.filterBody = new FilterBody()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userValidation.createUser(),
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            handel_validation_errors,
            this.userController.create
        )

        this.router.put(
            "/update-my-account" , 
            this.userAuth.Auth,
            this.filterBody.filter(["firstName" , "email" , "lastName" , "password" , "mobile"]),
            this.userValidation.updateProfile(),
            handel_validation_errors,
            this.userController.updateProfile
        )

        this.router.put(
            "/blocked-user/:id",
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.userController.blockedUser
        )

        this.router.put(
            "/active-my-account/:id",
            validateMongodbId, 
            this.userController.activeMyAccount
        )
        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userValidation.updateUser(),
            handel_validation_errors,
            this.userController.updateOne
        )

        this.router.get(
            "/" , 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.userController.find
        )

        this.router.get(
            "/find-wishList" , 
            this.userAuth.Auth,
            this.userController.findWishList
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.userController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.userController.deleteOne
        )

    }
}