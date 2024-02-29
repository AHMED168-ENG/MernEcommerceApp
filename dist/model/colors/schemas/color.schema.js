"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const ColorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
}, { timestamps: true });
ColorSchema.index({ "name": 1 });
ColorSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
exports.default = ColorSchema;
