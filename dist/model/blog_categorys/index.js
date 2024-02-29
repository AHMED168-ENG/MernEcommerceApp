"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blog_categorySchema_1 = __importDefault(require("./schemas/blog_categorySchema"));
const tbl_blog_category = mongoose_1.default.model("tbl_blog_category", blog_categorySchema_1.default);
exports.default = tbl_blog_category;
