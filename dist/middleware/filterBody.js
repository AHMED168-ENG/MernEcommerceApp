"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilterBody {
    filter(selectors) {
        return (req, res, next) => {
            let newBody = {};
            let { body } = req;
            selectors.forEach(ele => {
                newBody[ele] = body[ele];
            });
            req.body = newBody;
            next();
        };
    }
}
exports.default = FilterBody;
