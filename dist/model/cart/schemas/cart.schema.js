"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const CartSchema = new mongoose_1.Schema({
    products: [
        {
            product_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "tbl_product"
            },
            count: Number,
            color: String,
            _id: false
        },
    ],
    total_price: Number,
    price_after_discount: Number,
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "tbl_users",
        required: true
    },
}, { timestamps: true });
CartSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
CartSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.default = CartSchema;
