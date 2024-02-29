"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const color_validation_1 = __importDefault(require("../../validations/color/color.validation"));
const color_controller_1 = __importDefault(require("../../controller/color/color.controller"));
class ColorRouter {
    constructor() {
        this.colorValidation = new color_validation_1.default();
        this.colorController = new color_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.userAuth.permission(["admin"]), this.colorValidation.name(), handelBodyError_1.default, this.colorController.create);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.colorValidation.name(), handelBodyError_1.default, this.colorController.updateOne);
        this.router.get("/", this.colorValidation.checkPaginationParams(), handelBodyError_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.colorController.find);
        this.router.get("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.colorController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["admin"]), this.colorController.deleteOne);
    }
}
exports.default = ColorRouter;
