"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const color_schema_1 = __importDefault(require("./schemas/color.schema"));
const tbl_color = mongoose_1.default.model("tbl_color", color_schema_1.default);
exports.default = tbl_color;
