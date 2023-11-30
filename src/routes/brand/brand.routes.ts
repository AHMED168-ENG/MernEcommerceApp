import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import BrandController from "../../controller/brand/brand.controller";
import BrandValidation from "../../validations/brand/brand.validation";


export default class BrandRouter {
    public router : Router
    private readonly brandValidation : BrandValidation
    private readonly brandController : BrandController
    private readonly userAuth : UserAuth
    constructor() {
        this.brandValidation = new BrandValidation()
        this.brandController = new BrandController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.brandValidation.createBrand(),
            handel_validation_errors,
            this.brandController.create
        )

        this.router.put(
            "/activate-brand/:id",
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.brandController.activationBrand
        )

        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.brandValidation.updateBrand(),
            handel_validation_errors,
            this.brandController.updateOne
        )

        this.router.get(
            "/",
            this.brandValidation.checkPaginationParams(),
            handel_validation_errors,
            this.brandController.find
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            this.brandController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.brandController.deleteOne
        )

    }
}