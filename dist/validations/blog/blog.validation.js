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
const blog_services_1 = __importDefault(require("../../services/blog/blog.services"));
class BlogValidation {
    title(id) {
        return (0, express_validator_1.check)("title").notEmpty().withMessage("enter blog title please").custom((val, { req }) => __awaiter(this, void 0, void 0, function* () {
            const blogService = new blog_services_1.default();
            let query = { title: val };
            if (id)
                query._id = { $ne: req.params.id };
            const blog = yield blogService.findWithQuery(query);
            if (blog)
                return Promise.reject("");
            return true;
        })).withMessage("this blog title entered before").trim();
    }
    description() {
        return (0, express_validator_1.check)("description").notEmpty().withMessage("enter blog description please").trim();
    }
    category() {
        return (0, express_validator_1.check)("category").notEmpty().withMessage("enter blog category please");
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
    createBlog() {
        return [
            this.title(),
            this.description(),
            this.category(),
        ];
    }
    updateBlog() {
        return [
            this.title(true),
            this.description(),
            this.category(),
        ];
    }
    likesAndDislikes() {
        return [
            this.isLiked(),
            this.isDisLiked()
        ];
    }
    page() {
        return (0, express_validator_1.query)("page").isInt({ gt: 0 });
    }
    limit() {
        return (0, express_validator_1.query)("limit").isInt({ gt: 0 });
    }
    width() {
        return (0, express_validator_1.check)("width").notEmpty().isNumeric();
    }
    height() {
        return (0, express_validator_1.check)("height").notEmpty().isNumeric();
    }
    imageDimension() {
        return [this.width(), this.height()];
    }
    checkPaginationParams() {
        return [
            this.page(),
            this.limit()
        ];
    }
}
exports.default = BlogValidation;
