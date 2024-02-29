"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const product_comment_validation_1 = __importDefault(require("../../validations/product_comment/product_comment.validation"));
const product_comment_controller_1 = __importDefault(require("../../controller/product_comment/product_comment.controller"));
class ProductCommentRouter {
    constructor() {
        this.productCommentValidation = new product_comment_validation_1.default();
        this.productCommentController = new product_comment_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.productCommentValidation.createProductComment(), handelBodyError_1.default, this.productCommentController.create);
        this.router.put("/likes-and-dislike/:id", validateMongodbId_1.default, this.userAuth.Auth, this.productCommentValidation.likesAndDislikes(), handelBodyError_1.default, this.productCommentController.likesAndDislike);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.productCommentValidation.updateProductComment(), handelBodyError_1.default, this.productCommentController.updateOne);
        this.router.get("/:id", this.productCommentController.find);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.productCommentController.deleteOne);
    }
}
exports.default = ProductCommentRouter;
