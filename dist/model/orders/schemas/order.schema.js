"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const product_1 = require("../../../constant/product");
const OrderSchema = new mongoose_1.Schema({
    products: [
        {
            product_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "tbl_product"
            },
            count: Number,
            color: String
        }
    ],
    payment_intent: {},
    order_status: {
        type: String,
        enum: product_1.ORDER_STATUS,
        default: "Not Proceed"
    },
    ordered_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "tbl_users",
        required: true
    },
}, { timestamps: true });
OrderSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
OrderSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.default = OrderSchema;
