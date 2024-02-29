"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken;
}
exports.default = setCsrfToken;
