"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema_1 = __importDefault(require("./schemas/blogSchema"));
const tbl_blog = mongoose_1.default.model("tbl_blog", blogSchema_1.default);
exports.default = tbl_blog;
