"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_config_1 = __importDefault(require("./logging.config"));
const config_1 = require("./config");
class ConnectDb {
    constructor() {
        this.logging = new logging_config_1.default();
    }
    connect() {
        mongoose_1.default.connect(config_1.Config.MONGOODBURL).then(() => {
            this.logging.loggerOperationInfo().info("connected successful to database");
        }).catch((error) => {
            this.logging.loggerOperationError().error(`connected fail to database ( ${error.message} )`);
        });
    }
}
exports.default = ConnectDb;
