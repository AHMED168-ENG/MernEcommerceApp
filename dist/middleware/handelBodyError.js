"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_status_1 = __importDefault(require("http-status"));
function handel_validation_errors(req, res, next) {
    let newError = {};
    let param = [];
    let errors = [];
    let Errors = (0, express_validator_1.validationResult)(req);
    if (!Errors.isEmpty()) {
        errors = Errors.errors;
    }
    else {
        return next();
    }
    errors === null || errors === void 0 ? void 0 : errors.forEach((element) => {
        if (!param.includes(element.param)) {
            param.push(element.param);
            newError[element.param] = [element];
        }
        else {
            newError[element.param].push(element);
        }
    });
    return res.status(http_status_1.default.BAD_REQUEST).json({
        errors: newError,
    });
}
exports.default = handel_validation_errors;
