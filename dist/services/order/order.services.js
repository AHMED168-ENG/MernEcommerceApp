"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = __importDefault(require("../../model/orders"));
const helper_1 = require("../../helper/helper");
class OrderService {
    find(query, sanitize) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, page, sort } = query;
            let others = new helper_1.Others();
            let newQuery = yield others.sanitizeQuery(query, sanitize);
            let newSort = yield others.sortDocs(sort);
            let aggregateStage = [
                {
                    $lookup: {
                        from: "tbl_users",
                        as: "ordered_by",
                        foreignField: "_id",
                        localField: "ordered_by",
                        pipeline: [{
                                $project: {
                                    email: 1,
                                    firstName: 1,
                                    lastName: 1,
                                }
                            }]
                    }
                },
                {
                    $unwind: {
                        path: "$ordered_by",
                        preserveNullAndEmptyArrays: true
                    }
                },
                { $match: newQuery },
                { $sort: newSort }
            ];
            let aggregate = orders_1.default.aggregate(aggregateStage);
            return yield orders_1.default.aggregatePaginate(aggregate, { limit, page });
        });
    }
}
exports.default = OrderService;
