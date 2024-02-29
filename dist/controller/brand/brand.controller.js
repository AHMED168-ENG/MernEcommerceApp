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
const brand_services_1 = __importDefault(require("../../services/brand/brand.services"));
class BrandController {
    constructor() { }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const brandService = new brand_services_1.default();
                const brand = yield brandService.create(body);
                return res.status(http_status_1.default.CREATED).json(brand);
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
                const brandService = new brand_services_1.default();
                const brand = yield brandService.find(query, ["title"]);
                return res.status(http_status_1.default.OK).json(brand);
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
                const brandService = new brand_services_1.default();
                const brand = yield brandService.findOne(id);
                return res.status(http_status_1.default.OK).json(brand);
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
                const brandService = new brand_services_1.default();
                const brand = yield brandService.updateOne(id, body);
                return res.status(http_status_1.default.OK).json(brand);
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
                const brandService = new brand_services_1.default();
                yield brandService.deleteOne(id);
                return res.status(http_status_1.default.OK).json({
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activationBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const brandService = new brand_services_1.default();
                let brand = yield brandService.findOne(id);
                console.log(brand);
                brand = yield brandService.activation(id, { active: !brand.active });
                return res.status(http_status_1.default.OK).json(brand);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = BrandController;
