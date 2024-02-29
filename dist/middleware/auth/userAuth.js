"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../config/config");
const users_services_1 = __importDefault(require("../../services/user/users.services"));
class UserAuth {
    constructor() { }
    Auth(req, res, next) {
        var _a;
        try {
            let authorization = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            let token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
            if (!authorization || !token) {
                return res.status(http_status_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: "you not authorized"
                });
            }
            jsonwebtoken_1.default.verify(token, config_1.Config.SECRET_KEY, (error, decode) => __awaiter(this, void 0, void 0, function* () {
                if (((error === null || error === void 0 ? void 0 : error.name) == "TokenExpiredError")) {
                    return res.status(http_status_1.default.UNAUTHORIZED).json({
                        msg: "token expired",
                        success: false,
                    });
                }
                else {
                    const userService = new users_services_1.default();
                    let user = yield userService.findOne(decode === null || decode === void 0 ? void 0 : decode.id);
                    req.user = user;
                    return next();
                }
            }));
        }
        catch (error) {
            next(error);
        }
    }
    permission(permission) {
        return (req, res, next) => {
            try {
                const user = req.user;
                if (!permission.includes(user === null || user === void 0 ? void 0 : user.role)) {
                    return res.status(http_status_1.default.FORBIDDEN).json({
                        message: "you not allowed to access"
                    });
                }
                next();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = UserAuth;
