"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildError(statusCode, message, data = null) {
    let err = new Error(message);
    err.statusCode = statusCode;
    console.log(err);
    if (data != null)
        err.data = data;
    return err;
}
exports.default = buildError;
