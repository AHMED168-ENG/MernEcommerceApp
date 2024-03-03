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
const users_services_1 = __importDefault(require("../../services/user/users.services"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../config/config");
const ErrorBuilder_1 = __importDefault(require("../../helper/ErrorBuilder"));
class UserController {
    constructor() { }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const userService = new users_services_1.default();
                const user = yield userService.create(Object.assign(Object.assign({}, body), { active: true }));
                return res.status(http_status_1.default.CREATED).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, page } = req.query;
                const userService = new users_services_1.default();
                const users = yield userService.find(+limit, +page);
                return res.status(http_status_1.default.OK).json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findWishList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const userService = new users_services_1.default();
                const users = yield userService.findWishList(id);
                return res.status(http_status_1.default.OK).json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userService = new users_services_1.default();
                const user = yield userService.findOne(id);
                return res.status(http_status_1.default.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                const userService = new users_services_1.default();
                const user = yield userService.updateOne(id, body);
                return res.status(http_status_1.default.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const { body } = req;
                const userService = new users_services_1.default();
                const user = yield userService.updateOne(id, body);
                return res.status(http_status_1.default.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userService = new users_services_1.default();
                yield userService.deleteOne(id);
                return res.status(http_status_1.default.OK).json({
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    blockedUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userService = new users_services_1.default();
                let user = yield userService.findOne(id);
                yield userService.updateOne(id, { isBlocked: !user.isBlocked });
                return res.status(http_status_1.default.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    activeMyAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userService = new users_services_1.default();
                let user = yield userService.activeMyAccount(id);
                return res.status(http_status_1.default.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userService = new users_services_1.default();
                const cookies = req.cookies;
                if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken))
                    throw (0, ErrorBuilder_1.default)(http_status_1.default.UNAUTHORIZED, "refresh token not found");
                const user = yield userService.findWithQuery({ refreshToken: cookies.refreshToken });
                if (!user)
                    throw (0, ErrorBuilder_1.default)(http_status_1.default.UNAUTHORIZED, "there is no user with this token");
                else {
                    jsonwebtoken_1.default.verify(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken, config_1.Config.SECRET_KEY, (error, decode) => __awaiter(this, void 0, void 0, function* () {
                        if (((error === null || error === void 0 ? void 0 : error.name) == "TokenExpiredError" || decode.id != user[0].id))
                            throw (0, ErrorBuilder_1.default)(http_status_1.default.UNAUTHORIZED, "error with token");
                        else {
                            return res.status(http_status_1.default.OK).json({
                                success: false,
                                token: yield userService.generateToken(user[0].id)
                            });
                        }
                    }));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { file } = req;
                const { width, height } = req.body;
                const userService = new users_services_1.default();
                let user = yield userService.uploadImage(file, { width, height }, id);
                return res.status(http_status_1.default.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("refreshToken");
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
