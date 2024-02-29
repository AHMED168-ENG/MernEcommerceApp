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
const users_services_1 = __importDefault(require("../../services/user/users.services"));
const http_status_1 = __importDefault(require("http-status"));
const authUser_1 = __importDefault(require("../../services/auth/authUser"));
class AuthUserController {
    constructor() { }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const authService = new authUser_1.default();
                const user = yield authService.register(body);
                return res.status(http_status_1.default.CREATED).json({
                    user: user,
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userService = new users_services_1.default();
                let user = yield userService.findWithEmail(email);
                if (user && user.comparePassword(password)) {
                    let refreshToken = yield userService.refreshToken(user._id);
                    user = yield userService.updateOne(user._id, { refreshToken: refreshToken });
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        maxAge: 72 * 60 * 60 * 1000,
                    });
                    return res.status(http_status_1.default.OK).json({
                        success: true,
                        user,
                        token: yield userService.generateToken(user._id)
                    });
                }
                else {
                    return res.status(http_status_1.default.FORBIDDEN).json({
                        message: "you not allowed to enter",
                        success: false
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const authService = new authUser_1.default();
                let token = yield authService.forgetPassword(email);
                return res.status(http_status_1.default.OK).send({ success: true, token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.query;
                const { password } = req.body;
                const authService = new authUser_1.default();
                const user = yield authService.resetPassword(password, token);
                return res.status(http_status_1.default.OK).send({ success: true, user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const { password } = req.body;
                let authService = new authUser_1.default();
                let user = yield authService.updatePassword(password, id);
                return res.status(http_status_1.default.OK).send({
                    success: true,
                    user
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthUserController;
