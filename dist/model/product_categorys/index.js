"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_categorySchema_1 = __importDefault(require("./schemas/product_categorySchema"));
const tbl_product_category = mongoose_1.default.model("tbl_product_category", product_categorySchema_1.default);
exports.default = tbl_product_category;
