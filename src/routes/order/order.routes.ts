import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import EnqValidation from "../../validations/enq/enq.validation";
import OrderController from "../../controller/order/order.controller";
import UserAuth from "../../middleware/auth/userAuth";

export default class OrderRouter {
    public router : Router
    private readonly enqValidation : EnqValidation
    private readonly orderController : OrderController
    private readonly userAuth : UserAuth
    constructor() {
        this.enqValidation = new EnqValidation()
        this.orderController = new OrderController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.get(
            "/" , 
            this.enqValidation.checkPaginationParams(),
            handel_validation_errors,
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.orderController.find
        )
    }
}