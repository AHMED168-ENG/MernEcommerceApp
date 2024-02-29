"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function createPasswordResetToken() {
    let restateToken = crypto_1.default.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto_1.default.createHash("sha256").update(restateToken).digest("hex");
    this.passwordResetExpiration = Date.now() + 10 * 60 * 1000;
    return restateToken;
}
exports.default = createPasswordResetToken;
