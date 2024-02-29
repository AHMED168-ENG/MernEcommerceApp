"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema_1 = __importDefault(require("./schemas/userSchema"));
const index_1 = __importDefault(require("../users/hook/index"));
const index_2 = __importDefault(require("./methods/index"));
(0, index_1.default)(userSchema_1.default);
(0, index_2.default)(userSchema_1.default);
const tbl_user = mongoose_1.default.model("tbl_user", userSchema_1.default);
exports.default = tbl_user;
