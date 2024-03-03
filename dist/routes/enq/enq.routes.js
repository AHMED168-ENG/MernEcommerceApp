"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handelBodyError_1 = __importDefault(require("../../middleware/handelBodyError"));
const validateMongodbId_1 = __importDefault(require("../../middleware/validateMongodbId"));
const userAuth_1 = __importDefault(require("../../middleware/auth/userAuth"));
const enq_validation_1 = __importDefault(require("../../validations/enq/enq.validation"));
const enq_controller_1 = __importDefault(require("../../controller/enq/enq.controller"));
class EnqRouter {
    constructor() {
        this.enqValidation = new enq_validation_1.default();
        this.enqController = new enq_controller_1.default();
        this.userAuth = new userAuth_1.default();
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    Routes() {
        this.router.post("/", this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.enqValidation.create(), handelBodyError_1.default, this.enqController.create);
        this.router.put("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.enqValidation.update(), handelBodyError_1.default, this.enqController.updateOne);
        this.router.get("/", this.enqValidation.checkPaginationParams(), handelBodyError_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.enqController.find);
        this.router.get("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.enqController.findOne);
        this.router.delete("/:id", validateMongodbId_1.default, this.userAuth.Auth, this.userAuth.permission(["Admin"]), this.enqController.deleteOne);
    }
}
exports.default = EnqRouter;
