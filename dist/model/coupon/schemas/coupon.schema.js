"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const CouponSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    discount: {
        type: Number,
        default: 0
    },
    discount_type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
    },
    count: Number,
    expiration: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
CouponSchema.index({ "name": 1 });
CouponSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
CouponSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.default = CouponSchema;
