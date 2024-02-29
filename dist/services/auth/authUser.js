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
const config_1 = require("../../config/config");
const users_services_1 = __importDefault(require("../user/users.services"));
const mail_1 = require("../../mail/mail");
const ErrorBuilder_1 = __importDefault(require("../../helper/ErrorBuilder"));
const http_status_1 = __importDefault(require("http-status"));
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            const sendMails = new mail_1.SendMails();
            const user = yield userService.create(body);
            sendMails.send({
                email: user.email,
                fName: user.firstName,
                lName: user.lastName,
                subject: "active your account please ",
                url: `http://localhost:${config_1.Config.port}/api/user/active-my-account/${user.id} `,
            });
            return user;
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            const sendMails = new mail_1.SendMails();
            let user = yield userService.findWithEmail(email);
            const token = yield user.createPasswordResetToken();
            yield sendMails.send({
                email: user.email,
                fName: user.firstName,
                lName: user.lastName,
                subject: "Reset You Password 😇",
                url: `http://localhost:${config_1.Config.port}/${token} `,
            });
            user.save();
            return token;
        });
    }
    resetPassword(password, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            const sendMails = new mail_1.SendMails();
            token = crypto_1.default.createHash("sha256").update(token).digest("hex");
            const user = (yield userService.findWithQuery({ passwordResetToken: token, passwordResetExpiration: { $gt: Date.now() } }))[0];
            if (!user)
                throw (0, ErrorBuilder_1.default)(http_status_1.default.FORBIDDEN, "your token is expired go back and do process again");
            user.password = password;
            user.passwordResetExpiration = null;
            user.passwordResetToken = null;
            user.passwordChangeAt = Date.now();
            user.save().then(() => {
                sendMails.send({
                    email: user.email,
                    fName: user.firstName,
                    lName: user.lastName,
                    subject: "your password reset successful",
                });
            });
            return user;
        });
    }
    updatePassword(password, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            return yield userService.updatePassword(password, id);
        });
    }
}
exports.default = AuthService;
