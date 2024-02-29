"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const enq_1 = require("../../constant/enq");
class EnqValidation {
    email() {
        return (0, express_validator_1.check)("email").notEmpty().withMessage("enter enq email please");
    }
    name() {
        return (0, express_validator_1.check)("name").notEmpty().withMessage("enter enq name please");
    }
    mobile() {
        return (0, express_validator_1.check)("mobile").notEmpty().withMessage("enter enq mobile please");
    }
    comment() {
        return (0, express_validator_1.check)("comment").notEmpty().withMessage("enter enq comment please");
    }
    status() {
        return (0, express_validator_1.check)("status").optional().custom((val, { req }) => {
            if (!enq_1.ENQ_STATUS.includes(val))
                return Promise.reject("status accept value as one from " + enq_1.ENQ_STATUS.join(" , "));
            return true;
        });
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
    create() {
        return [
            this.name(),
            this.email(),
            this.mobile(),
            this.comment(),
        ];
    }
    update() {
        return [
            this.name(),
            this.email(),
            this.mobile(),
            this.comment(),
            this.status(),
        ];
    }
}
exports.default = EnqValidation;
