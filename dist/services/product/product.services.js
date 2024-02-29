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
const product_1 = __importDefault(require("../../model/product"));
const helper_1 = require("../../helper/helper");
const users_services_1 = __importDefault(require("../user/users.services"));
const mongoose_1 = require("mongoose");
class ProductService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.create(body);
            return product;
        });
    }
    updateOne(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.findByIdAndUpdate(_id, body, { new: true });
            return product;
        });
    }
    find(query, sanitize = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, page, sort } = query;
            let others = new helper_1.Others();
            let newQuery = yield others.sanitizeQuery(query, sanitize);
            let newSort = yield others.sortDocs(sort);
            let stages = this.getStage(newQuery, newSort);
            let aggregation = product_1.default.aggregate(stages);
            const products = yield product_1.default.aggregatePaginate(aggregation, { limit, page });
            return products;
        });
    }
    findOneWithAggregate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let stages = this.getStage({ _id: new mongoose_1.Types.ObjectId(_id) }, { _id: 1 });
            const product = yield product_1.default.aggregate(stages);
            return product;
        });
    }
    findOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.findOne({ _id });
            return product[0];
        });
    }
    findWithQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.findOne(query);
            return product;
        });
    }
    findAllWithQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.default.find(query);
            return products;
        });
    }
    bulkWrite(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.bulkWrite(query);
        });
    }
    activation(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield this.updateOne(_id, body);
            return product;
        });
    }
    deleteOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.deleteOne({ _id });
            return product;
        });
    }
    addToWishList(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new users_services_1.default();
            let user = yield userService.findOne(userId);
            const inWallet = user.wishlist.find((id) => id.toString() == productId);
            if (!inWallet) {
                user = yield userService.updateOne(userId, { $push: { wishlist: productId } });
            }
            else {
                user = yield userService.updateOne(userId, { $pull: { wishlist: new mongoose_1.Types.ObjectId(productId) } });
            }
            return user;
        });
    }
    addRate(productId, userId, start) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield this.findOne(productId);
            if (!product)
                throw new Error("product not found");
            const inRate = product.rating.find((id) => id.userId.toString() == userId);
            if (!inRate) {
                product = yield this.updateOne(productId, { $push: { rating: { rate: start, userId } } });
            }
            else {
                product = yield this.updateOne(productId, { $pull: { rating: inRate } });
            }
            product.save();
            return product;
        });
    }
    uploadImage(files, dimension, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!files || !files.length)
                throw new Error("chose your product images");
            let product = yield this.findOne(id);
            let imageOperations = new helper_1.ImageOperations();
            let imagesFormate = yield imageOperations.formateImages(files, { width: +dimension.width, height: +dimension.height });
            let imagesCloud = yield imageOperations.uploadFilesCloud(imagesFormate, "product");
            let publicIds = [];
            publicIds = product.images.map(ele => ele.public_id);
            yield imageOperations.deleteFilesCloud(publicIds);
            let images = [];
            images = imagesCloud.map(ele => {
                return { url: ele.url, public_id: ele.public_id };
            });
            return yield this.updateOne(id, { $set: { images: images } });
        });
    }
    getStage(newQuery, newSort) {
        return [
            { $match: newQuery },
            {
                $lookup: {
                    from: "tbl_product_categories",
                    foreignField: "_id",
                    localField: "category",
                    as: "category",
                    pipeline: [{
                            $project: {
                                "title": 1
                            }
                        }]
                }
            },
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "tbl_brands",
                    foreignField: "_id",
                    localField: "brands",
                    as: "brands",
                    pipeline: [
                        { $match: {
                                active: true
                            } },
                        {
                            $project: {
                                "title": 1,
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "tbl_colors",
                    foreignField: "_id",
                    localField: "colors",
                    as: "colors",
                    pipeline: [
                        {
                            $project: {
                                "name": 1,
                            }
                        }
                    ]
                }
            },
            { $unwind: { path: "$rating", preserveNullAndEmptyArrays: true } },
            { $group: {
                    _id: "$_id",
                    total: { $sum: "$rating.rate" },
                    count: { $sum: 1 },
                    title: { $first: "$title" },
                    description: { $first: "$description" },
                    slug: { $first: "$slug" },
                    price: { $first: "$price" },
                    category: { $first: "$category" },
                    brands: { $first: "$brands" },
                    discount: { $first: "$discount" },
                    discount_type: { $first: "$discount_type" },
                    quantity: { $first: "$quantity" },
                    sold: { $first: "$sold" },
                    images: { $first: "$images" },
                    colors: { $first: "$colors" },
                    rating: { $first: "$rating" },
                    active: { $first: "$active" },
                }
            },
            {
                $project: {
                    total_rate: { $divide: ["$total", "$count"] },
                    title: "$title",
                    description: "$description",
                    slug: "$slug",
                    price: "$price",
                    category: "$category",
                    brands: "$brands",
                    quantity: "$quantity",
                    sold: "$sold",
                    discount_type: "$discount_type",
                    discount: "$discount",
                    images: "$images",
                    colors: "$colors",
                    rating: { $cond: { if: { $eq: ["$rating", null] }, then: 0, else: "$rating" } },
                    active: "$active",
                }
            },
            { $sort: newSort }
        ];
    }
}
exports.default = ProductService;
