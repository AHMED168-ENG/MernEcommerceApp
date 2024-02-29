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
const coupon_services_1 = __importDefault(require("../../services/coupon/coupon.services"));
class couponValidation {
    name(id) {
        return (0, express_validator_1.check)("name").notEmpty().withMessage("enter coupon name please").custom((val, { req }) => __awaiter(this, void 0, void 0, function* () {
            const couponService = new coupon_services_1.default();
            let query = { name: val };
            if (id)
                query._id = { $ne: req.params.id };
            const coupon = yield couponService.findWithQuery(query);
            if (coupon)
                return Promise.reject("");
            return true;
        })).withMessage("this coupon already exist").trim();
    }
    discount() {
        return (0, express_validator_1.check)("discount").notEmpty().withMessage("enter coupon discount ").isNumeric().withMessage("this field accept number");
    }
    discount_type() {
        return (0, express_validator_1.check)("discount_type").notEmpty().withMessage("enter coupon discount type ").custom((val, { req }) => {
            let types = ['percentage', 'fixed'];
            if (!types.includes(val))
                throw new Error(`discount type should be in ${types.join(" , ")} `);
            return true;
        });
    }
    count() {
        return (0, express_validator_1.check)("count").notEmpty().withMessage("enter coupon count available").isNumeric().withMessage("coupon count accept number");
    }
    expiration() {
        return (0, express_validator_1.check)("expiration").notEmpty().withMessage("enter coupon expiration ").isISO8601().toDate().withMessage("this field accept date");
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
    createCoupon() {
        return [
            this.name(),
            this.discount_type(),
            this.discount(),
            this.expiration(),
            this.count()
        ];
    }
    updateCoupon() {
        return [
            this.name(true),
            this.discount_type(),
            this.discount(),
            this.expiration(),
            this.count()
        ];
    }
}
exports.default = couponValidation;
