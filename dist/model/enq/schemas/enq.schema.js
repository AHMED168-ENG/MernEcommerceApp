"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const enq_1 = require("../../../constant/enq");
const EnqSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: enq_1.ENQ_STATUS,
        default: "submitted"
    },
}, { timestamps: true });
EnqSchema.index({ "name": 1 }, { unique: false });
EnqSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
exports.default = EnqSchema;
