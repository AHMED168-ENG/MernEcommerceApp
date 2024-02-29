"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cart_schema_1 = __importDefault(require("./schemas/cart.schema"));
const tbl_cart = mongoose_1.default.model("tbl_cart", cart_schema_1.default);
exports.default = tbl_cart;
