"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../config/config");
function HashPassword(next, user) {
    if (user.isNew || user.password) {
        user.password = bcrypt_1.default.hashSync(user.password, +config_1.Config.SALT_ROUNDS);
    }
    else if (user.getUpdate().password) {
        this.setUpdate(Object.assign(Object.assign({}, this.getUpdate()), { password: bcrypt_1.default.hashSync(this.getUpdate().password, +config_1.Config.SALT_ROUNDS) }));
    }
    next();
}
exports.default = HashPassword;
