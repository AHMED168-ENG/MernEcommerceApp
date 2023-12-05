import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import colorController from "../../controller/color/color.controller";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import colorValidation from "../../validations/color/color.validation";
import ColorValidation from "../../validations/color/color.validation";
import ColorController from "../../controller/color/color.controller";

export default class ColorRouter {
    public router : Router
    private readonly colorValidation : colorValidation
    private readonly colorController : colorController
    private readonly userAuth : UserAuth
    constructor() {
        this.colorValidation = new ColorValidation()
        this.colorController = new ColorController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.colorValidation.name(),
            handel_validation_errors,
            this.colorController.create
        )

        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.colorValidation.name(),
            handel_validation_errors,
            this.colorController.updateOne
        )

        this.router.get(
            "/" , 
            this.colorValidation.checkPaginationParams(),
            handel_validation_errors,
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.colorController.find
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.colorController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.colorController.deleteOne
        )


    }
}