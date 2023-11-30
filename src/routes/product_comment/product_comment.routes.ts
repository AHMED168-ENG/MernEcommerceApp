import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import productCommentValidation from "../../validations/product_comment/product_comment.validation";
import ProductCommentController from "../../controller/product_comment/product_comment.controller";


export default class ProductCommentRouter {
    public router : Router
    private readonly productCommentValidation : productCommentValidation
    private readonly productCommentController : ProductCommentController
    private readonly userAuth : UserAuth
    constructor() {
        this.productCommentValidation = new productCommentValidation()
        this.productCommentController = new ProductCommentController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userAuth.Auth,
            this.productCommentValidation.createProductComment(),
            handel_validation_errors,
            this.productCommentController.create
        )
        this.router.put(
            "/likes-and-dislike/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.productCommentValidation.likesAndDislikes(),
            handel_validation_errors,
            this.productCommentController.likesAndDislike
        )
        this.router.put(    
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.productCommentValidation.updateProductComment(),
            handel_validation_errors,
            this.productCommentController.updateOne
        )

        this.router.get(
            "/:id",
            this.productCommentController.find
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.productCommentController.deleteOne
        )

    }
}