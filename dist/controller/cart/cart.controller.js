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
const http_status_1 = __importDefault(require("http-status"));
const cart_services_1 = __importDefault(require("../../services/cart/cart.services"));
class CartController {
    constructor() { }
    addToCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product } = req.body;
                const { id } = req.user;
                const cartService = new cart_services_1.default();
                const cart = yield cartService.cartOperation(product, id);
                return res.status(http_status_1.default.CREATED).json({
                    cart,
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeFromCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_id } = req.params;
                const { id } = req.user;
                const cartService = new cart_services_1.default();
                const cart = yield cartService.removeProductFromCart(product_id, id);
                return res.status(http_status_1.default.CREATED).json({
                    cart: cart.products.length == 1 || null,
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    findOneWithPopulate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const cartService = new cart_services_1.default();
                const cart = yield cartService.findOneWithPopulate(id);
                return res.status(http_status_1.default.OK).json({
                    cart,
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateCartCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_id } = req.params;
                const userId = req.user.id;
                const { count } = req.body.product;
                const cartService = new cart_services_1.default();
                const cart = yield cartService.updateCartCount(product_id, userId, count);
                return res.status(http_status_1.default.OK).json({
                    cart,
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const cartService = new cart_services_1.default();
                yield cartService.deleteOne(id, userId);
                return res.status(http_status_1.default.OK).json({
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    useCouponInCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const coupon = req.params.id;
                const cartService = new cart_services_1.default();
                const cart = yield cartService.useCouponInCart(userId, coupon);
                return res.status(http_status_1.default.OK).json({
                    success: true,
                    cart
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const { COD } = req.body;
                const cartService = new cart_services_1.default();
                const cart = yield cartService.createOrder(userId, COD);
                return res.status(http_status_1.default.OK).json({
                    success: true,
                    cart
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const cartService = new cart_services_1.default();
                const orders = yield cartService.getAllOrder(userId);
                return res.status(http_status_1.default.OK).json({
                    success: true,
                    orders
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const { id } = req.params;
                const cartService = new cart_services_1.default();
                const order = yield cartService.getOrder(userId, id);
                return res.status(http_status_1.default.OK).json({
                    success: true,
                    order
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    changeOrderStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { order_status } = req.body;
                const userId = req.user.id;
                const { id } = req.params;
                const cartService = new cart_services_1.default();
                const order = yield cartService.changeOrderStatus(id, order_status, userId);
                return res.status(http_status_1.default.OK).json({
                    success: true,
                    order
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CartController;
