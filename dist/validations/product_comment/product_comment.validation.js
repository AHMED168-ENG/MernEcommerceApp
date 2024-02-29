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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
class productCommentValidation {
    comment() {
        return (0, express_validator_1.check)("comment").notEmpty().withMessage("enter your comment please");
    }
    product_id() {
        return (0, express_validator_1.check)("product_id").custom((val, { req }) => __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(val))
                return Promise.reject("");
            return true;
        })).withMessage("not valid product id").trim();
    }
    createProductComment() {
        return [
            this.comment(),
            this.product_id(),
        ];
    }
    updateProductComment() {
        return [
            this.comment(),
        ];
    }
    page() {
        return (0, express_validator_1.query)("page").isInt({ gt: 0 });
    }
    limit() {
        return (0, express_validator_1.query)("limit").isInt({ gt: 0 });
    }
    checkPaginationParams() {
        return [
            this.page(),
            this.limit()
        ];
    }
    isLiked() {
        return (0, express_validator_1.check)("isLiked").notEmpty().withMessage("enter isLiked column in body").custom((value) => {
            if (![true, false].includes(value))
                throw new Error();
            return true;
        }).withMessage("this field accept boolean value");
    }
    isDisLiked() {
        return (0, express_validator_1.check)("isDisLiked").notEmpty().withMessage("enter isDisLiked column in body").custom((value) => {
            if (![true, false].includes(value))
                throw new Error();
            return true;
        }).withMessage("this field accept boolean value");
    }
    likesAndDislikes() {
        return [
            this.isLiked(),
            this.isDisLiked()
        ];
    }
}
exports.default = productCommentValidation;
