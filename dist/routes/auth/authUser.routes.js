"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authUser_controller_1 = __importDefault(require("../../controller/auth/authUser.controller"));
const user_validation_1 = __importDefault(require("../../validations/users/user.validation"));
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
class AuthUserRouter {
    constructor() {
        this.authUserController = new authUser_controller_1.default();
        this.userValidation = new user_validation_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/register", this.userValidation.createUser(), handelBodyError_1.default, this.authUserController.register);
        this.router.post("/login", this.userValidation.loginUser(), handelBodyError_1.default, this.authUserController.login);
        this.router.put("/update-password", this.userAuth.Auth, this.userValidation.resetPassword(), handelBodyError_1.default, this.authUserController.updatePassword);
        this.router.post("/forget-password", this.userValidation.forgetPassword(), handelBodyError_1.default, this.authUserController.forgetPassword);
        this.router.post("/reset-password", this.userValidation.resetPassword(), handelBodyError_1.default, this.authUserController.resetPassword);
    }
}
exports.default = AuthUserRouter;
