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
const brand_services_1 = __importDefault(require("../../services/brand/brand.services"));
class BrandValidation {
    title(id) {
        return (0, express_validator_1.check)("title").notEmpty().withMessage("enter Category title please").custom((val, { req }) => __awaiter(this, void 0, void 0, function* () {
            const brandService = new brand_services_1.default();
            let query = { title: val };
            if (id)
                query._id = { $ne: req.params.id };
            const brand = yield brandService.findWithQuery(query);
            if (brand)
                return Promise.reject("");
            return true;
        })).withMessage("this category already exist").trim();
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
    createBrand() {
        return [
            this.title(),
        ];
    }
    updateBrand() {
        return [
            this.title(true),
        ];
    }
}
exports.default = BrandValidation;
