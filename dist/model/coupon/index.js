"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const coupon_schema_1 = __importDefault(require("./schemas/coupon.schema"));
const tbl_coupon = mongoose_1.default.model("tbl_coupon", coupon_schema_1.default);
exports.default = tbl_coupon;
