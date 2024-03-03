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
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const users_services_1 = __importDefault(require("../../services/user/users.services"));
const password_validator_1 = __importDefault(require("password-validator"));
class UserValidation {
    email(id) {
        return (0, express_validator_1.check)("email").isEmail().notEmpty().withMessage("Enter your email").isEmail().withMessage("this field accept email")
            .custom((userEmail, { req }) => __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            let query = { email: userEmail };
            if (id) {
                query._id = {
                    $ne: req.params.id ? req.params.id : req.user.id
                };
            }
            const user = yield userService.findWithQuery(query);
            if (user.length) {
                return Promise.reject("");
            }
            return true;
        })).withMessage("this email already existed").trim().toLowerCase();
    }
    loginEmail() {
        return (0, express_validator_1.check)("email").notEmpty().withMessage("Enter your email").isEmail().withMessage("this field accept email")
            .custom((userEmail, { req }) => __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            const user = yield userService.findWithEmail(userEmail);
            if (!user) {
                return Promise.reject("");
            }
            return true;
        })).withMessage("this email not correct").trim().toLowerCase();
    }
    loginPassword() {
        return (0, express_validator_1.check)("password").notEmpty().withMessage("enter your password");
    }
    id() {
        return (0, express_validator_1.param)("id").custom((val, { req }) => {
            if (!(0, mongoose_1.isValidObjectId)(val))
                throw new Error();
            return true;
        }).withMessage("this is invalid user id param");
    }
    firstName() {
        return (0, express_validator_1.check)("firstName").notEmpty().withMessage("Enter your first name");
    }
    mobile(id) {
        return (0, express_validator_1.check)("mobile").notEmpty().withMessage("Enter your mobile")
            .custom((userMobile, { req }) => __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            let query = { mobile: userMobile };
            if (id) {
                query._id = {
                    $ne: req.params.id ? req.params.id : req.user.id
                };
            }
            const user = yield userService.findWithQuery(query);
            if (user.length) {
                return Promise.reject("");
            }
            return true;
        })).withMessage("this mobile already existed");
    }
    lastName() {
        return (0, express_validator_1.check)("lastName").notEmpty().withMessage("Enter your last name");
    }
    passwordLength() {
        return (0, express_validator_1.check)("password").isLength({ min: 10 }).withMessage("your password length should be more than 10");
    }
    password() {
        return (0, express_validator_1.check)("password").custom((val, { req }) => {
            if (!val)
                return true;
            let passValidator = new password_validator_1.default();
            passValidator
                .is()
                .min(8)
                .is()
                .max(20)
                .is()
                .lowercase(2)
                .is()
                .uppercase(1)
                .has()
                .digits(2)
                .has()
                .symbols(2);
            if (!passValidator.validate(val)) {
                throw new Error("");
            }
            return true;
        }).withMessage("password should contain lower case and upper case and should be minimum 8 and should be max 20 and should contain at lest 2 symbols and special character");
    }
    passwordReset() {
        return (0, express_validator_1.check)("resetPassword").custom((val, { req }) => {
            if (req.body.password && (req.body.password !== val))
                throw new Error("");
            return true;
        }).withMessage("password should be matched");
    }
    createUser() {
        return [
            this.email(),
            this.firstName(),
            this.lastName(),
            this.passwordLength(),
            this.password(),
            this.passwordReset(),
            this.mobile(),
        ];
    }
    updateUser() {
        return [
            this.email(true),
            this.firstName(),
            this.lastName(),
            this.password(),
            this.mobile(true),
            this.id(),
        ];
    }
    updateProfile() {
        return [
            this.email(true),
            this.firstName(),
            this.lastName(),
            this.password(),
            this.mobile(true),
        ];
    }
    loginUser() {
        return [
            this.loginPassword(),
            this.loginEmail(),
        ];
    }
    resetPassword() {
        return [
            this.passwordLength(),
            this.password()
        ];
    }
    imageDimension() {
        return [this.width(), this.height()];
    }
    width() {
        return (0, express_validator_1.check)("width").notEmpty().isNumeric();
    }
    height() {
        return (0, express_validator_1.check)("height").notEmpty().isNumeric();
    }
    emailForgetPassword() {
        return (0, express_validator_1.check)("email").notEmpty().withMessage("Enter your email").isEmail().withMessage("this field accept email")
            .custom((userEmail, { req }) => __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            const user = yield userService.findWithEmail(userEmail);
            if (!user) {
                return Promise.reject("");
            }
            return true;
        })).withMessage("this email not register").trim().toLowerCase();
    }
    forgetPassword() {
        return [
            this.emailForgetPassword()
        ];
    }
}
exports.default = UserValidation;
