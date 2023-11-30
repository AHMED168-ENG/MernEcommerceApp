import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import ProductController from "../../controller/product/product.controller";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import ProductValidation from "../../validations/product/product.validation";
import { ImageOperations } from "../../helper/helper";

export default class ProductRouter {
    public router : Router
    private readonly productValidation : ProductValidation
    private readonly productController : ProductController
    public readonly imagesOperations : ImageOperations
    private readonly userAuth : UserAuth
    constructor() {
        this.productValidation = new ProductValidation()
        this.productController = new ProductController()
        this.imagesOperations = new ImageOperations()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.productValidation.createProduct(),
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            handel_validation_errors,
            this.productController.create
        )

        this.router.put(
            "/activate-product/:id",
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.productController.activationProduct
        )
        
        this.router.put(
            "/upload-image/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.imagesOperations.uploadMulter().array("image" , 3),
            this.productValidation.imageDimension(),
            handel_validation_errors,
            this.productController.uploadImage
        )

        this.router.put(
            "/wishlist/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.productController.addToWishList
        )
        
        this.router.put(
            "/cart/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.productController.addToCart
        )

        this.router.put(
            "/rate/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.productValidation.start(),
            handel_validation_errors,
            this.productController.addRate
        )

        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.productValidation.updateProduct(),
            handel_validation_errors,
            this.productController.updateOne
        )

        this.router.get(
            "/" , 
            this.userAuth.Auth,
            this.productValidation.checkPaginationParams(),
            handel_validation_errors,
            this.productController.find
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.productController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.productController.deleteOne
        )

    }
}