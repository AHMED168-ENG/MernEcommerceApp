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
const helper_1 = require("../../helper/helper");
const blog_categorys_1 = __importDefault(require("../../model/blog_categorys"));
const mongoose_1 = require("mongoose");
class BlogCategoryService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCategory = yield blog_categorys_1.default.create(body);
            return blogCategory;
        });
    }
    updateOne(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCategory = yield blog_categorys_1.default.findByIdAndUpdate(_id, { $set: body }, { new: true });
            return blogCategory;
        });
    }
    find(query, sanitize) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, page, sort } = query;
            let others = new helper_1.Others();
            let newQuery = yield others.sanitizeQuery(query, sanitize);
            let newSort = yield others.sortDocs(sort);
            let aggregateStage = [
                { $graphLookup: {
                        from: 'tbl_blog_categories',
                        startWith: '$parentId',
                        connectFromField: 'parentId',
                        connectToField: '_id',
                        as: 'parents',
                        maxDepth: 10,
                    } },
                { $match: newQuery },
                { $sort: newSort }
            ];
            let aggregate = blog_categorys_1.default.aggregate(aggregateStage);
            const blogCategory = yield blog_categorys_1.default.aggregatePaginate(aggregate, { limit, page });
            return blogCategory;
        });
    }
    findOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let aggregateStage = [
                { $graphLookup: {
                        from: 'tbl_blog_categories',
                        startWith: '$parentId',
                        connectFromField: 'parentId',
                        connectToField: '_id',
                        as: 'parents',
                        maxDepth: 10,
                    } },
                { $match: { _id: new mongoose_1.Types.ObjectId(_id) } },
            ];
            const blogCategory = yield blog_categorys_1.default.aggregate(aggregateStage);
            return blogCategory[0];
        });
    }
    findWithQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCategory = yield blog_categorys_1.default.findOne(query);
            return blogCategory;
        });
    }
    activation(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogCategory = yield this.updateOne(_id, body);
            return blogCategory;
        });
    }
    deleteOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCategory = yield blog_categorys_1.default.deleteOne({ _id });
            return blogCategory;
        });
    }
}
exports.default = BlogCategoryService;
