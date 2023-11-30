import { Router } from "express";
import handel_validation_errors from "../../middleware/handelBodyError";
import BlogController from "../../controller/blog/blog.controller";
import validateMongodbId from "../../middleware/validateMongodbId";
import UserAuth from "../../middleware/auth/userAuth";
import BlogValidation from "../../validations/blog/blog.validation";
import { ImageOperations } from "../../helper/helper";

export default class BlogRouter {
    public router : Router
    public imagesOperations : ImageOperations
    private readonly blogValidation : BlogValidation
    private readonly blogController : BlogController
    private readonly userAuth : UserAuth
    constructor() {
        this.blogValidation = new BlogValidation()
        this.blogController = new BlogController()
        this.userAuth = new UserAuth()
        this.imagesOperations = new ImageOperations()
        this.router = Router()
        this.Routes()
    }

    private Routes() {
        this.router.post(
            "/" , 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.blogValidation.createBlog(),
            handel_validation_errors,
            this.blogController.create
        )

        this.router.put(
            "/change-blog-views",
            this.userAuth.Auth,
            this.blogController.changeBlogViewNumber
        )
        
        this.router.put(
            "/likes-and-dislike/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.blogValidation.likesAndDislikes(),
            handel_validation_errors,
            this.blogController.likesAndDislike
        )
        
        this.router.put(
            "/activate-blog/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.blogController.activationBlog
        )
        
        this.router.put(
            "/upload-image/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.imagesOperations.uploadMulter().array("image" , 1),
            this.blogValidation.imageDimension(),
            handel_validation_errors,
            this.blogController.uploadImage
        )

        this.router.put(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.blogValidation.updateBlog(),
            handel_validation_errors,
            this.blogController.updateOne
        )

        this.router.get(
            "/" , 
            this.blogValidation.checkPaginationParams(),
            handel_validation_errors,
            // this.userAuth.Auth,
            // this.userAuth.permission(["admin"]),
            this.blogController.find
        )

        this.router.get(
            "/:id", 
            validateMongodbId, 
            // this.userAuth.Auth,
            // this.userAuth.permission(["admin"]),
            this.blogController.findOne
        )

        this.router.delete(
            "/:id", 
            validateMongodbId, 
            this.userAuth.Auth,
            this.userAuth.permission(["admin"]),
            this.blogController.deleteOne
        )


    }
}