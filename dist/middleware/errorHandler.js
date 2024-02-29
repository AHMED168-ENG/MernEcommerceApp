"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const logging_config_1 = __importDefault(require("../config/logging.config"));
function errorHandler(error, req, res, next) {
    var _a;
    const logging = new logging_config_1.default();
    logging.loggerOperationError().error(error.message);
    res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : http_status_1.default.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        success: false,
        stack: process.env.NODE_SERVER_ENV == "production" ? null : error.stack,
    });
    console.log(error);
}
exports.default = errorHandler;
