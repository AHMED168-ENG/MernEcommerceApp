"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enq_schema_1 = __importDefault(require("./schemas/enq.schema"));
const tbl_enq = mongoose_1.default.model("tbl_enq", enq_schema_1.default);
exports.default = tbl_enq;
