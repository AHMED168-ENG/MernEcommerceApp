"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    },
    address: String,
    wishlist: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "tbl_product",
            default: []
        }
    ],
    passwordChangeAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpiration: {
        type: Date,
    },
    image: {
        type: {
            url: String,
            public_id: String
        },
        default: { url: "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg" }
    },
    active: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
UserSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
UserSchema.index({ email: 1 });
exports.default = UserSchema;
