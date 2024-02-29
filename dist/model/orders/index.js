"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const order_schema_1 = __importDefault(require("./schemas/order.schema"));
const tbl_order = mongoose_1.default.model("tbl_order", order_schema_1.default);
exports.default = tbl_order;
