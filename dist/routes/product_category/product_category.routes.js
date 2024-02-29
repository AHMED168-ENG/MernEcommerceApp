"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const product_category_validation_1 = __importDefault(require("../../validations/product_category/product_category.validation"));
const product_category_controller_1 = __importDefault(require("../../controller/product_category/product_category.controller"));
class ProductCategoryRouter {
    constructor() {
        this.productCategoryValidation = new product_category_validation_1.default();
        this.productCategoryController = new product_category_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.userAuth.permission(["admin"]), this.productCategoryValidation.createProductCategory(), handelBodyError_1.default, this.productCategoryController.create);
        this.router.put("/activate-product-category/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.productCategoryController.activationProductCategory);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.productCategoryValidation.updateProductCategory(), handelBodyError_1.default, this.productCategoryController.updateOne);
        this.router.get("/", this.productCategoryValidation.checkPaginationParams(), handelBodyError_1.default, this.productCategoryController.find);
        this.router.get("/:id", validateMongodbId_1.default, this.productCategoryController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.productCategoryController.deleteOne);
    }
}
exports.default = ProductCategoryRouter;
