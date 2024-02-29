"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashPassword_1 = __importDefault(require("./hashPassword"));
function default_1(schema) {
    schema.pre(["save", "findOneAndUpdate"], function (next) {
        (0, hashPassword_1.default)(next, this);
    });
}
exports.default = default_1;
