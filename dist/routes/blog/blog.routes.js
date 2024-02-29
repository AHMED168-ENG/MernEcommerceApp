"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const blog_controller_1 = __importDefault(require("../../controller/blog/blog.controller"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const blog_validation_1 = __importDefault(require("../../validations/blog/blog.validation"));
const helper_1 = require("../../helper/helper");
class BlogRouter {
    constructor() {
        this.blogValidation = new blog_validation_1.default();
        this.blogController = new blog_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.imagesOperations = new helper_1.ImageOperations();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.userAuth.permission(["admin"]), this.blogValidation.createBlog(), handelBodyError_1.default, this.blogController.create);
        this.router.put("/change-blog-views", this.userAuth.Auth, this.blogController.changeBlogViewNumber);
        this.router.put("/likes-and-dislike/:id", validateMongodbId_1.default, this.userAuth.Auth, this.blogValidation.likesAndDislikes(), handelBodyError_1.default, this.blogController.likesAndDislike);
        this.router.put("/activate-blog/:id", validateMongodbId_1.default, this.userAuth.Auth, this.blogController.activationBlog);
        this.router.put("/upload-image/:id", validateMongodbId_1.default, this.userAuth.Auth, this.imagesOperations.uploadMulter().array("image", 1), this.blogValidation.imageDimension(), handelBodyError_1.default, this.blogController.uploadImage);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.blogValidation.updateBlog(), handelBodyError_1.default, this.blogController.updateOne);
        this.router.get("/", this.blogValidation.checkPaginationParams(), handelBodyError_1.default, this.blogController.find);
        this.router.get("/:id", validateMongodbId_1.default, this.blogController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.blogController.deleteOne);
    }
}
exports.default = BlogRouter;
