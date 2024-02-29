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
const http_status_1 = __importDefault(require("http-status"));
const helper_1 = require("../../helper/helper");
const product_category_services_1 = __importDefault(require("../../services/product_category/product_category.services"));
class ProductCategoryController {
    constructor() { }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const productCategoryService = new product_category_services_1.default();
                const others = new helper_1.Others();
                body.slug = yield others.makeSlug(body.title);
                const productCategory = yield productCategoryService.create(body);
                return res.status(http_status_1.default.CREATED).json(productCategory);
            }
            catch (error) {
                next(error);
            }
        });
    }
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const productCategoryService = new product_category_services_1.default();
                const productCategory = yield productCategoryService.find(query, ["title", "brand"]);
                return res.status(http_status_1.default.OK).json(productCategory);
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
                const productCategoryService = new product_category_services_1.default();
                const productCategory = yield productCategoryService.findOne(id);
                return res.status(http_status_1.default.OK).json(productCategory);
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
                const others = new helper_1.Others();
                body.slug = yield others.makeSlug(body.title);
                const productCategoryService = new product_category_services_1.default();
                const productCategory = yield productCategoryService.updateOne(id, body);
                return res.status(http_status_1.default.OK).json(productCategory);
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
                const productCategoryService = new product_category_services_1.default();
                yield productCategoryService.deleteOne(id);
                return res.status(http_status_1.default.OK).json({
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activationProductCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const productCategoryService = new product_category_services_1.default();
                let productCategory = yield productCategoryService.findOne(id);
                productCategory = yield productCategoryService.activation(id, { active: !productCategory.active });
                return res.status(http_status_1.default.OK).json(productCategory);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductCategoryController;
