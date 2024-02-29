"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const enq_validation_1 = __importDefault(require("../../validations/enq/enq.validation"));
const order_controller_1 = __importDefault(require("../../controller/order/order.controller"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
class OrderRouter {
    constructor() {
        this.enqValidation = new enq_validation_1.default();
        this.orderController = new order_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.get("/", this.enqValidation.checkPaginationParams(), handelBodyError_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.orderController.find);
    }
}
exports.default = OrderRouter;
