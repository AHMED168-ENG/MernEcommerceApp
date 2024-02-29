"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const coupon_controller_1 = __importDefault(require("../../controller/coupon/coupon.controller"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const coupon_validation_1 = __importDefault(require("../../validations/coupon/coupon.validation"));
class CouponRouter {
    constructor() {
        this.couponValidation = new coupon_validation_1.default();
        this.couponController = new coupon_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.userAuth.permission(["admin"]), this.couponValidation.createCoupon(), handelBodyError_1.default, this.couponController.create);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.couponValidation.updateCoupon(), handelBodyError_1.default, this.couponController.updateOne);
        this.router.get("/", this.couponValidation.checkPaginationParams(), handelBodyError_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.couponController.find);
        this.router.get("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.couponController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.couponController.deleteOne);
    }
}
exports.default = CouponRouter;
