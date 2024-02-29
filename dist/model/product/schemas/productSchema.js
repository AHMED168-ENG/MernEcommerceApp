"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const product_1 = require("../../../constant/product");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "tbl_product_category"
    },
    brands: {
        type: [mongoose_1.default.Types.ObjectId],
        ref: "tbl_brand",
        default: [],
    },
    quantity: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0
    },
    discount_type: {
        type: String,
        enum: product_1.DISCOUNT_TYPE,
        default: "amount"
    },
    sold: {
        type: Number,
        default: 0,
    },
    images: {
        type: [
            {
                url: String,
                public_id: String
            }
        ],
        default: [{ url: "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg" }]
    },
    colors: {
        type: [mongoose_1.Types.ObjectId],
        default: [],
        ref: "tbl_colors"
    },
    tags: {
        type: [String],
        default: [],
    },
    active: {
        type: Boolean,
        default: true
    },
    rating: {
        type: [
            {
                rate: Number,
                userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "tbl_user" }
            }
        ],
        default: []
    },
}, { timestamps: true });
productSchema.index({ "title": 1 });
productSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
productSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.default = productSchema;
