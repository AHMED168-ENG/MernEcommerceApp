"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ColorValidation {
    name() {
        return (0, express_validator_1.check)("name").notEmpty().withMessage("enter color name please");
    }
    page() {
        return (0, express_validator_1.query)("page").isInt({ gt: 0 });
    }
    limit() {
        return (0, express_validator_1.query)("limit").isInt({ gt: 0 });
    }
    checkPaginationParams() {
        return [
            this.page(),
            this.limit()
        ];
    }
}
exports.default = ColorValidation;
