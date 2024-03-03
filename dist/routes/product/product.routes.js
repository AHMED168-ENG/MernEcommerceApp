"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const product_controller_1 = __importDefault(require("../../controller/product/product.controller"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const product_validation_1 = __importDefault(require("../../validations/product/product.validation"));
const helper_1 = require("../../helper/helper");
class ProductRouter {
    constructor() {
        this.productValidation = new product_validation_1.default();
        this.productController = new product_controller_1.default();
        this.imagesOperations = new helper_1.ImageOperations();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.productValidation.createProduct(), this.userAuth.Auth, this.userAuth.permission(["Admin"]), handelBodyError_1.default, this.productController.create);
        this.router.put("/activate-product/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.productController.activationProduct);
        this.router.put("/upload-image/:id", validateMongodbId_1.default, this.userAuth.Auth, this.imagesOperations.uploadMulter().array("image", 3), this.productValidation.imageDimension(), handelBodyError_1.default, this.productController.uploadImage);
        this.router.put("/wishlist/:id", validateMongodbId_1.default, this.userAuth.Auth, this.productController.addToWishList);
        this.router.put("/cart/:id", validateMongodbId_1.default, this.userAuth.Auth, this.productController.addToCart);
        this.router.put("/rate/:id", validateMongodbId_1.default, this.userAuth.Auth, this.productValidation.start(), handelBodyError_1.default, this.productController.addRate);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.productValidation.updateProduct(), handelBodyError_1.default, this.productController.updateOne);
        this.router.get("/", this.userAuth.Auth, this.productValidation.checkPaginationParams(), handelBodyError_1.default, this.productController.find);
        this.router.get("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.productController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.productController.deleteOne);
    }
}
exports.default = ProductRouter;
