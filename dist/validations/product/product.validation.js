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
const product_services_1 = __importDefault(require("../../services/product/product.services"));
const product_1 = require("../../constant/product");
class ProductValidation {
    title(id) {
        return (0, express_validator_1.check)("title").notEmpty().withMessage("enter product title please").custom((val, { req }) => __awaiter(this, void 0, void 0, function* () {
            const productService = new product_services_1.default();
            let query = { title: val };
            if (id)
                query._id = { $ne: req.params.id };
            const product = yield productService.findWithQuery(query);
            if (product)
                return Promise.reject("");
            return true;
        })).withMessage("this title entered before").trim();
    }
    description() {
        return (0, express_validator_1.check)("description").notEmpty().withMessage("enter product description please").trim();
    }
    price() {
        return (0, express_validator_1.check)("price").notEmpty().withMessage("enter product price please").trim();
    }
    category() {
        return (0, express_validator_1.check)("category").notEmpty().withMessage("enter product category please").custom((val, { req }) => {
            if (!(0, mongoose_1.isValidObjectId)(val))
                throw new Error("");
            return true;
        }).withMessage("invalid category id").trim();
    }
    quantity() {
        return (0, express_validator_1.check)("price").notEmpty().withMessage("enter product quantity please").trim();
    }
    brands() {
        return (0, express_validator_1.check)("brands").custom((val, { req }) => {
            if (!val.length)
                throw new Error("");
            return true;
        }).withMessage("enter at lest on brands for product please").trim();
    }
    colors() {
        return (0, express_validator_1.check)("colors").custom((val, { req }) => {
            if (!val.length)
                throw new Error("");
            return true;
        }).withMessage("enter at lest on color for product please").trim();
    }
    discount_type() {
        return (0, express_validator_1.check)("discount_type").custom((val, { req }) => {
            if (!product_1.DISCOUNT_TYPE.includes(val))
                return Promise.reject(`this field accept ${product_1.DISCOUNT_TYPE.join(" ")} this value only`);
            return true;
        });
    }
    createProduct() {
        return [
            this.title(),
            this.price(),
            this.description(),
            this.category(),
            this.quantity(),
            this.brands(),
            this.colors(),
        ];
    }
    updateProduct() {
        return [
            this.title(true),
            this.price(),
            this.description(),
            this.category(),
            this.quantity(),
            this.brands(),
            this.colors(),
            this.discount_type(),
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
    start() {
        return (0, express_validator_1.check)("start").notEmpty().withMessage("enter your rate");
    }
    checkPaginationParams() {
        return [
            this.page(),
            this.limit()
        ];
    }
}
exports.default = ProductValidation;
