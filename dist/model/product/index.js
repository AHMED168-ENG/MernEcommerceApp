"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema_1 = __importDefault(require("./schemas/productSchema"));
const tbl_product = mongoose_1.default.model("tbl_product", productSchema_1.default);
exports.default = tbl_product;
