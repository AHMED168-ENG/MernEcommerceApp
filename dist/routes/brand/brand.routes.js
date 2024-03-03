"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const brand_controller_1 = __importDefault(require("../../controller/brand/brand.controller"));
const brand_validation_1 = __importDefault(require("../../validations/brand/brand.validation"));
class BrandRouter {
    constructor() {
        this.brandValidation = new brand_validation_1.default();
        this.brandController = new brand_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.brandValidation.createBrand(), handelBodyError_1.default, this.brandController.create);
        this.router.put("/activate-brand/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.brandController.activationBrand);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.brandValidation.updateBrand(), handelBodyError_1.default, this.brandController.updateOne);
        this.router.get("/", this.brandValidation.checkPaginationParams(), handelBodyError_1.default, this.brandController.find);
        this.router.get("/:id", validateMongodbId_1.default, this.brandController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.brandController.deleteOne);
    }
}
exports.default = BrandRouter;
