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
const product_1 = require("../../constant/product");
class CartValidation {
    productId() {
        return (0, express_validator_1.check)("product.product_id").notEmpty().withMessage("enter product id please").custom((val, { req }) => __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(val))
                return Promise.reject("this field accept object id");
            return true;
        }));
    }
    count() {
        return (0, express_validator_1.check)("product.count").notEmpty().withMessage("enter product count please").isNumeric().withMessage("this field accept number");
    }
    color() {
        return (0, express_validator_1.check)("product.color").notEmpty().withMessage("enter product color please");
    }
    COD() {
        return (0, express_validator_1.check)("COD").notEmpty().withMessage("enter COD ");
    }
    orderStatus() {
        return (0, express_validator_1.check)("order_status").notEmpty().withMessage("enter order_status").custom((value, { req }) => {
            if (!product_1.ORDER_STATUS.includes(value))
                return Promise.reject("value should be one of " + product_1.ORDER_STATUS.join(" , "));
            return true;
        });
    }
    addToCart() {
        return [
            this.productId(),
            this.count(),
            this.color()
        ];
    }
    updateCartCount() {
        return [
            this.count()
        ];
    }
    addOrder() {
        return [
            this.COD()
        ];
    }
}
exports.default = CartValidation;
