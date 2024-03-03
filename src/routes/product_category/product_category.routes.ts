import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import ProductCategoryValidation from "../../validations/product_category/product_category.validation";
import ProductCategoryController from "../../controller/product_category/product_category.controller";

export default class ProductCategoryRouter {
    public router : Router
    private readonly productCategoryValidation : ProductCategoryValidation
    private readonly productCategoryController : ProductCategoryController
    private readonly userAuth : UserAuth
    constructor() {
        this.productCategoryValidation = new ProductCategoryValidation()
        this.productCategoryController = new ProductCategoryController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.productCategoryValidation.createProductCategory(),
            handel_validation_errors,
            this.productCategoryController.create
        )

        this.router.put(
            "/activate-product-category/:id",
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.productCategoryController.activationProductCategory
        )

        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.productCategoryValidation.updateProductCategory(),
            handel_validation_errors,
            this.productCategoryController.updateOne
        )

        this.router.get(
            "/",
            this.productCategoryValidation.checkPaginationParams(),
            handel_validation_errors,
            this.productCategoryController.find
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            this.productCategoryController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["Admin"]),
            this.productCategoryController.deleteOne
        )

    }
}