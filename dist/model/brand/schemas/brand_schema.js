"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const BrandSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
BrandSchema.index({ "title": 1 });
BrandSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
BrandSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.default = BrandSchema;
