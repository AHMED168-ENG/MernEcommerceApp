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
const coupon_services_1 = __importDefault(require("../../services/coupon/coupon.services"));
class couponController {
    constructor() { }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const couponService = new coupon_services_1.default();
                const coupon = yield couponService.create(body);
                return res.status(http_status_1.default.CREATED).json({
                    coupon,
                    success: true
                });
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
                const couponService = new coupon_services_1.default();
                const coupon = yield couponService.find(query, ["name"]);
                return res.status(http_status_1.default.OK).json({
                    coupon,
                    success: true
                });
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
                const couponService = new coupon_services_1.default();
                const coupon = yield couponService.findOne(id);
                return res.status(http_status_1.default.OK).json({
                    coupon,
                    success: true
                });
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
                const couponService = new coupon_services_1.default();
                const coupon = yield couponService.updateOne(id, body);
                return res.status(http_status_1.default.OK).json({
                    coupon,
                    success: true
                });
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
                const couponService = new coupon_services_1.default();
                yield couponService.deleteOne(id);
                return res.status(http_status_1.default.OK).json({
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = couponController;