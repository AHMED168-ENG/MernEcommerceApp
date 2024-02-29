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
const product_services_1 = __importDefault(require("../../services/product/product.services"));
const helper_1 = require("../../helper/helper");
class ProductController {
    constructor() { }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const productService = new product_services_1.default();
                const others = new helper_1.Others();
                body.slug = yield others.makeSlug(body.title);
                const product = yield productService.create(body);
                return res.status(http_status_1.default.CREATED).json(product);
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
                const productService = new product_services_1.default();
                const products = yield productService.find(query, ["category", "rate", "title", "brand", "price"]);
                return res.status(http_status_1.default.OK).json(products);
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
                const productService = new product_services_1.default();
                const product = yield productService.findOneWithAggregate(id);
                return res.status(http_status_1.default.OK).json(product);
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
                const productService = new product_services_1.default();
                const product = yield productService.updateOne(id, body);
                return res.status(http_status_1.default.OK).json(product);
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
                const productService = new product_services_1.default();
                yield productService.deleteOne(id);
                return res.status(http_status_1.default.OK).json({
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activationProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const productService = new product_services_1.default();
                let product = yield productService.findOne(id);
                yield productService.activation(id, { active: !product.active });
                return res.status(http_status_1.default.OK).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    addToWishList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const productService = new product_services_1.default();
                let user = yield productService.addToWishList(id, userId);
                return res.status(http_status_1.default.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    addToCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                next(error);
            }
        });
    }
    addRate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const { start } = req.body;
                const productService = new product_services_1.default();
                let user = yield productService.addRate(id, userId, +start);
                return res.status(http_status_1.default.OK).json(user);
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
                const { files } = req;
                const { width, height } = req.body;
                const productService = new product_services_1.default();
                let product = yield productService.uploadImage(files, { width, height }, id);
                return res.status(http_status_1.default.OK).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductController;
