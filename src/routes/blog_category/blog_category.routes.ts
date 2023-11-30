import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import blogCategoryValidation from "../../validations/blog_category/blog_category.validation";
import blogCategoryController from "../../controller/blog_category/blog_category.controller";
import BlogCategoryValidation from "../../validations/blog_category/blog_category.validation";
import BlogCategoryController from "../../controller/blog_category/blog_category.controller";

export default class BlogCategoryRouter {
    public router : Router
    private readonly blogCategoryValidation : BlogCategoryValidation
    private readonly blogCategoryController : BlogCategoryController
    private readonly userAuth : UserAuth
    constructor() {
        this.blogCategoryValidation = new BlogCategoryValidation()
        this.blogCategoryController = new BlogCategoryController()
        this.userAuth = new UserAuth()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.blogCategoryValidation.createBlogCategory(),
            handel_validation_errors,
            this.blogCategoryController.create
        )

        this.router.put(
            "/activate-blog-category/:id",
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.blogCategoryController.activationBlogCategory
        )

        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.blogCategoryValidation.updateBlogCategory(),
            handel_validation_errors,
            this.blogCategoryController.updateOne
        )

        this.router.get(
            "/",
            this.blogCategoryValidation.checkPaginationParams(),
            handel_validation_errors,
            this.blogCategoryController.find
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            this.blogCategoryController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.blogCategoryController.deleteOne
        )

    }
}