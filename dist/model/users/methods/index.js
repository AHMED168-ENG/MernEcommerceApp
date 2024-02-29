"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comparePassword_1 = __importDefault(require("./comparePassword"));
const createPasswordResetToken_1 = __importDefault(require("./createPasswordResetToken"));
function default_1(schema) {
    schema.methods.comparePassword = comparePassword_1.default;
    schema.methods.createPasswordResetToken = createPasswordResetToken_1.default;
}
exports.default = default_1;
