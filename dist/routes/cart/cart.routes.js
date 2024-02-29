"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const cart_validation_1 = __importDefault(require("../../validations/cart/cart.validation"));
const cart_controller_1 = __importDefault(require("../../controller/cart/cart.controller"));
class CartRouter {
    constructor() {
        this.cartValidation = new cart_validation_1.default();
        this.cartController = new cart_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/add-to-cart", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartValidation.addToCart(), handelBodyError_1.default, this.cartController.addToCart);
        this.router.delete("/remove-product-cart/:product_id", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartController.removeFromCart);
        this.router.put("/change-product-count/:product_id", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartValidation.updateCartCount(), handelBodyError_1.default, this.cartController.updateCartCount);
        this.router.put("/add-coupon/:id", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartController.useCouponInCart);
        this.router.get("/my-cart", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartController.findOneWithPopulate);
        this.router.post("/add-order", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartValidation.addOrder(), handelBodyError_1.default, this.cartController.createOrder);
        this.router.get("/all-orders", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartController.getAllOrder);
        this.router.get("/get-order/:id", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartController.getOrder);
        this.router.put("/change-order-status/:id", this.userAuth.Auth, this.userAuth.permission(["user", "admin"]), this.cartValidation.orderStatus(), handelBodyError_1.default, this.cartController.changeOrderStatus);
    }
}
exports.default = CartRouter;
