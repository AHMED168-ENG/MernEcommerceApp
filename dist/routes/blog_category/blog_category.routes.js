"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const blog_category_validation_1 = __importDefault(require("../../validations/blog_category/blog_category.validation"));
const blog_category_controller_1 = __importDefault(require("../../controller/blog_category/blog_category.controller"));
class BlogCategoryRouter {
    constructor() {
        this.blogCategoryValidation = new blog_category_validation_1.default();
        this.blogCategoryController = new blog_category_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.blogCategoryValidation.createBlogCategory(), handelBodyError_1.default, this.blogCategoryController.create);
        this.router.put("/activate-blog-category/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.blogCategoryController.activationBlogCategory);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.blogCategoryValidation.updateBlogCategory(), handelBodyError_1.default, this.blogCategoryController.updateOne);
        this.router.get("/", this.blogCategoryValidation.checkPaginationParams(), handelBodyError_1.default, this.blogCategoryController.find);
        this.router.get("/:id", validateMongodbId_1.default, this.blogCategoryController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.blogCategoryController.deleteOne);
    }
}
exports.default = BlogCategoryRouter;
