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
const blog_1 = __importDefault(require("../../model/blog"));
const helper_1 = require("../../helper/helper");
const mongoose_1 = require("mongoose");
class BlogService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_1.default.create(body);
            return blog;
        });
    }
    updateOne(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_1.default.findByIdAndUpdate(_id, body, { new: true });
            return blog;
        });
    }
    find(query, sanitize) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, page, sort } = query;
            let others = new helper_1.Others();
            let newQuery = yield others.sanitizeQuery(query, ["category", "rate", "title"]);
            let newSort = yield others.sortDocs(sort);
            let aggregate = [
                {
                    $lookup: {
                        from: "tbl_blog_categories",
                        foreignField: "_id",
                        localField: "category",
                        as: "category",
                    }
                },
                {
                    $unwind: {
                        path: "$category",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: "tbl_users",
                        foreignField: "_id",
                        localField: "numViews",
                        as: "numViews",
                    }
                },
                { $addFields: {
                        "isLiked": {
                            $cond: {
                                if: { $in: [new mongoose_1.Types.ObjectId(query.id), "$likes"] },
                                then: true,
                                else: false
                            }
                        }
                    } },
                {
                    $lookup: {
                        from: "tbl_users",
                        foreignField: "_id",
                        localField: "likes",
                        as: "likes",
                    }
                },
                { $match: newQuery },
                { $sort: newSort },
            ];
            let aggregation = blog_1.default.aggregate(aggregate);
            const blogs = yield blog_1.default.aggregatePaginate(aggregation, { limit, page });
            return blogs;
        });
    }
    findOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_1.default.findOne({ _id });
            return blog;
        });
    }
    findWithQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_1.default.findOne(query);
            return blog;
        });
    }
    changeBlogViews(_id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var x = 0; x < _id.length; x++) {
                let blog = yield blog_1.default.findOne({ _id: _id[x] }, { numViews: 1 });
                if (!blog.numViews.includes(userId)) {
                    blog = yield blog_1.default.findOneAndUpdate({ _id: _id[x] }, { $push: { numViews: userId } }, { new: true });
                }
            }
            return true;
        });
    }
    likesAndDislike(_id, isLike, isDisLiked, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let bulkWrite = [];
            if (isLike) {
                bulkWrite = [
                    {
                        updateOne: {
                            filter: { _id },
                            update: { $pull: {
                                    disLikes: userId
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
                bulkWrite = [];
                if (!isDisLiked) {
                    bulkWrite.push({
                        updateOne: {
                            filter: { _id },
                            update: { $pull: {
                                    disLikes: userId
                                } }
                        },
                    });
                }
                else {
                    bulkWrite.push({
                        updateOne: {
                            filter: { _id },
                            update: { $push: {
                                    disLikes: userId
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
            console.log(bulkWrite);
            yield blog_1.default.bulkWrite(bulkWrite);
            return true;
        });
    }
    deleteOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_1.default.deleteOne({ _id });
            return blog;
        });
    }
    activation(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = yield this.updateOne(_id, body);
            return blog;
        });
    }
    uploadImage(files, dimension, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!files || !files.length)
                throw new Error("chose your blog images");
            let blog = yield this.findOne(id);
            let imageOperations = new helper_1.ImageOperations();
            let imagesFormate = yield imageOperations.formateImages(files, { width: +dimension.width, height: +dimension.height });
            let imagesCloud = yield imageOperations.uploadFilesCloud(imagesFormate, "blog");
            let publicIds = [];
            publicIds = blog.images.map(ele => ele.public_id);
            yield imageOperations.deleteFilesCloud(publicIds);
            console.log(publicIds);
            let images = [];
            images = imagesCloud.map(ele => {
                return { url: ele.url, public_id: ele.public_id };
            });
            return yield this.updateOne(id, { $set: { images: images } });
        });
    }
}
exports.default = BlogService;
