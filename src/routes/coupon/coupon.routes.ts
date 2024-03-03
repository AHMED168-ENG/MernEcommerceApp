import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import couponController from "../../controller/coupon/coupon.controller";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import couponValidation from "../../validations/coupon/coupon.validation";

export default class CouponRouter {
    public router : Router
    private readonly couponValidation : couponValidation
    private readonly couponController : couponController
    private readonly userAuth : UserAuth
    constructor() {
        this.couponValidation = new couponValidation()
        this.couponController = new couponController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.couponValidation.createCoupon(),
            handel_validation_errors,
            this.couponController.create
        )

        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.couponValidation.updateCoupon(),
            handel_validation_errors,
            this.couponController.updateOne
        )

        this.router.get(
            "/" , 
            this.couponValidation.checkPaginationParams(),
            handel_validation_errors,
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.couponController.find
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.couponController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.couponController.deleteOne
        )


    }
}