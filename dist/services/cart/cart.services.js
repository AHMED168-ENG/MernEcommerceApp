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
const cart_1 = __importDefault(require("../../model/cart"));
const orders_1 = __importDefault(require("../../model/orders"));
const helper_1 = require("../../helper/helper");
const product_services_1 = __importDefault(require("../product/product.services"));
const coupon_services_1 = __importDefault(require("../coupon/coupon.services"));
const ErrorBuilder_1 = __importDefault(require("../../helper/ErrorBuilder"));
const uniqid_1 = __importDefault(require("uniqid"));
class CartService {
    cartOperation(product, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let cart = yield this.findOne(userId);
            if (!cart) {
                return this.createCart(product, userId);
            }
            else {
                return this.addProductToCart(cart, product, userId);
            }
        });
    }
    createCart(product, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let productsPrice = yield this.getTotalPrice(product);
            return yield cart_1.default.create({
                products: [product],
                total_price: productsPrice.totalPrice,
                price_after_discount: productsPrice.totalPriceAfterDiscount,
                user_id: userId
            });
        });
    }
    addProductToCart(cart, product, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cart.products.find(ele => ele.product_id == product.product_id)) {
                let newProducts = cart.products.map(ele => {
                    if (ele.product_id == product.product_id) {
                        ele.count += product.count;
                    }
                    return ele;
                });
                let productsPrice = yield this.getTotalPrice(newProducts);
                return yield this.updateOne({ _id: cart.id, user_id: userId }, {
                    $set: {
                        products: newProducts,
                        total_price: productsPrice.totalPrice,
                        price_after_discount: productsPrice.totalPriceAfterDiscount,
                    }
                });
            }
            let newCart = {};
            let products = cart.products;
            products.push(product);
            let productsPrice = yield this.getTotalPrice(products);
            newCart = {
                products: products,
                total_price: productsPrice.totalPrice,
                price_after_discount: productsPrice.totalPriceAfterDiscount,
                user_id: userId
            };
            return yield this.updateOne({ _id: cart.id, user_id: userId }, { $set: newCart });
        });
    }
    removeProductFromCart(productId, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let cart = yield this.findWithQuery({ user_id });
            if (!cart)
                throw new Error("this product not belong to you");
            if (cart.products.length == 1) {
                yield this.deleteOne(cart.id, user_id);
            }
            else {
                let newProducts = cart.products.filter((ele) => ele.product_id.toString() != productId);
                let productsPrice = yield this.getTotalPrice(newProducts);
                let newCart = {
                    products: newProducts,
                    total_price: productsPrice.totalPrice,
                    price_after_discount: productsPrice.totalPriceAfterDiscount,
                    user_id: user_id
                };
                cart = yield this.updateOne({ _id: cart.id }, { $set: newCart });
            }
            return cart;
        });
    }
    updateOne(query, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_1.default.findByIdAndUpdate(query, body, { new: true });
            console.log(cart);
            return cart;
        });
    }
    updateCartCount(productId, userId, count) {
        return __awaiter(this, void 0, void 0, function* () {
            let cart = yield this.findOne(userId);
            if (!cart)
                throw new Error("this product not belong to you");
            cart.products = cart.products.map(ele => {
                if (ele.product_id.toString() == productId) {
                    ele.count = count;
                }
                return ele;
            });
            let productPrice = yield this.getTotalPrice(cart.products);
            cart = yield this.updateOne({ _id: cart.id, user_id: userId }, { $set: {
                    products: cart.products,
                    total_price: productPrice.totalPrice,
                    price_after_discount: productPrice.totalPriceAfterDiscount,
                } });
            return cart;
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, page, sort } = query;
            let others = new helper_1.Others();
            let newSort = yield others.sortDocs(sort);
            const carts = yield cart_1.default.paginate({ limit, page, sort: newSort });
            return carts;
        });
    }
    findOne(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_1.default.findOne({ user_id });
            return cart;
        });
    }
    findOneWithPopulate(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.findOne(user_id);
            let productPrice = yield this.getTotalPrice(cart.products);
            return yield cart_1.default.findOneAndUpdate({ user_id }, {
                products: cart.products,
                total_price: productPrice.totalPrice,
                price_after_discount: productPrice.totalPriceAfterDiscount,
            }, { new: true }).populate([{ path: "products.product_id", populate: { path: "category" } }]);
        });
    }
    findWithQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_1.default.findOne(query);
            return cart;
        });
    }
    deleteOne(_id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_1.default.deleteOne({ _id, userId });
            return cart;
        });
    }
    getTotalPrice(product) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = !Array.isArray(product) ? [product] : product;
            const productService = new product_services_1.default();
            const productsId = products.map(ele => ele.product_id);
            const productsData = yield productService.findAllWithQuery({ _id: { $in: productsId } });
            let totalPrice = 0;
            let totalPriceAfterDiscount = 0;
            productsData.forEach(element => {
                let quantity = products.find(ele => ele.product_id == element.id).count;
                let priceForCount = element.price * quantity;
                totalPrice += priceForCount;
                if (element.discount_type == "amount") {
                    totalPriceAfterDiscount += (priceForCount - (element.discount * quantity));
                }
                else {
                    let discountAsAmount = (element.discount / 100) * priceForCount;
                    totalPriceAfterDiscount += (priceForCount - discountAsAmount);
                }
            });
            return {
                totalPriceAfterDiscount,
                totalPrice
            };
        });
    }
    useCouponInCart(user_id, coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            const couponService = new coupon_services_1.default();
            const couponData = yield couponService.findOne(coupon);
            if (!couponData)
                throw (0, ErrorBuilder_1.default)(404, "this coupon not existed");
            let cart = yield this.findOne(user_id);
            if (!cart)
                throw (0, ErrorBuilder_1.default)(404, "you do not have eny carts");
            let coupon_discount = couponData.discount;
            if (couponData.discount_type == "percentage") {
                coupon_discount = (couponData.discount * 100) / cart.total_price;
            }
            cart = yield this.updateOne({ _id: cart.id, user_id }, { $set: {
                    products: cart.products,
                    total_price: cart.total_price,
                    price_after_discount: (cart.price_after_discount - coupon_discount),
                } });
            yield couponService.updateOne(coupon, { $inc: { count: -1 } });
            return cart;
        });
    }
    createOrder(user_id, COD) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!COD)
                throw (0, ErrorBuilder_1.default)(403, "Create cash order failed");
            const cart = yield this.findOne(user_id);
            if (!cart)
                throw (0, ErrorBuilder_1.default)(404, "you do not have cart");
            const order = yield orders_1.default.create({
                products: cart.products,
                payment_intent: {
                    id: (0, uniqid_1.default)(),
                    method: "COD",
                    amount: (_a = cart.price_after_discount) !== null && _a !== void 0 ? _a : cart.total_price,
                    status: "Cash On Delivery",
                    created: Date.now(),
                    currency: "usd"
                },
                order_status: "Cash On Delivery",
                ordered_by: user_id
            });
            const bulkWrite = [];
            cart.products.forEach(ele => {
                bulkWrite.push({ updateOne: {
                        filter: { _id: ele.product_id },
                        update: { $inc: { sold: 1, quantity: -1 } }
                    } });
            });
            const productService = new product_services_1.default();
            productService.bulkWrite(bulkWrite);
            return order;
        });
    }
    getAllOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orders_1.default.find({
                ordered_by: user_id
            }).populate("products.product_id");
        });
    }
    getOrder(user_id, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orders_1.default.findOne({
                ordered_by: user_id,
                _id
            }).populate("products.product_id");
        });
    }
    changeOrderStatus(_id, order_status, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orders_1.default.findByIdAndUpdate({
                _id,
                ordered_by: userId
            }, { order_status }).populate("products.product_id");
        });
    }
}
exports.default = CartService;
