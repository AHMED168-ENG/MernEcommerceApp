import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import EnqValidation from "../../validations/enq/enq.validation";
import EnqController from "../../controller/enq/enq.controller";

export default class EnqRouter {
    public router : Router
    private readonly enqValidation : EnqValidation
    private readonly enqController : EnqController
    private readonly userAuth : UserAuth
    constructor() {
        this.enqValidation = new EnqValidation()
        this.enqController = new EnqController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.enqValidation.create(),
            handel_validation_errors,
            this.enqController.create
        )

        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.enqValidation.update(),
            handel_validation_errors,
            this.enqController.updateOne
        )

        this.router.get(
            "/" , 
            this.enqValidation.checkPaginationParams(),
            handel_validation_errors,
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.enqController.find
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.enqController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.enqController.deleteOne
        )


    }
}