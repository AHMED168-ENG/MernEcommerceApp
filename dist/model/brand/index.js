"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const brand_schema_1 = __importDefault(require("./schemas/brand_schema"));
const tbl_brand = mongoose_1.default.model("tbl_brand", brand_schema_1.default);
exports.default = tbl_brand;
