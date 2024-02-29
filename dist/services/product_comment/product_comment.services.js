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
const product_comment_1 = __importDefault(require("../../model/product_comment"));
class ProductCommentService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const productComment = yield product_comment_1.default.create(body);
            return productComment;
        });
    }
    updateOne(_id, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield product_comment_1.default.findOne({ _id });
            if (comment.user_id.toString() != userId)
                throw new Error("this comment not belong to you");
            const productComment = yield product_comment_1.default.findByIdAndUpdate(_id, body, { new: true });
            return productComment;
        });
    }
    find(product_id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, page } = query;
            const productComment = yield product_comment_1.default.paginate({ limit, page, query: { product_id } });
            return productComment;
        });
    }
    deleteOne(_id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield product_comment_1.default.findOne({ _id });
            if (comment.user_id.toString() != userId)
                throw new Error("this comment not belong to you");
            const productComment = yield product_comment_1.default.deleteOne({ _id });
            return productComment;
        });
    }
    commentLike(_id, isLike, isDisLiked, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let bulkWrite = [];
            if (isLike) {
                bulkWrite = [
                    {
                        updateOne: {
                            filter: { _id },
                            update: { $pull: {
                                    dis_likes: userId
                                } }
                        },
                    },
                    {
                        updateOne: {
                            filter: { _id },
                            update: { $pull: {
                                    likes: userId
                                } }
                        },
                    },
                    {
                        updateOne: {
                            filter: { _id },
                            update: { $push: {
                                    likes: userId
                                } }
                        }
                    }
                ];
            }
            else {
                if (!isDisLiked) {
                    bulkWrite.push({
                        updateOne: {
                            filter: { _id },
                            update: { $pull: {
                                    dis_likes: userId
                                } }
                        },
                    });
                }
                else {
                    bulkWrite.push({
                        updateOne: {
                            filter: { _id },
                            update: { $push: {
                                    dis_likes: userId
                                } }
                        }
                    });
                }
                bulkWrite.push({
                    updateOne: {
                        filter: { _id },
                        update: { $pull: {
                                likes: userId
                            } }
                    },
                });
            }
            return yield product_comment_1.default.bulkWrite(bulkWrite);
        });
    }
}
exports.default = ProductCommentService;
