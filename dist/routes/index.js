"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authUser_routes_1 = __importDefault(require("./auth/authUser.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const product_routes_1 = __importDefault(require("./product/product.routes"));
const blog_routes_1 = __importDefault(require("./blog/blog.routes"));
const product_category_routes_1 = __importDefault(require("./product_category/product_category.routes"));
const blog_category_routes_1 = __importDefault(require("./blog_category/blog_category.routes"));
const brand_routes_1 = __importDefault(require("./brand/brand.routes"));
const product_comment_routes_1 = __importDefault(require("./product_comment/product_comment.routes"));
const coupon_routes_1 = __importDefault(require("./coupon/coupon.routes"));
const cart_routes_1 = __importDefault(require("./cart/cart.routes"));
const color_routes_1 = __importDefault(require("./color/color.routes"));
const enq_routes_1 = __importDefault(require("./enq/enq.routes"));
const order_routes_1 = __importDefault(require("./order/order.routes"));
class ApiRoutes {
    constructor(app) {
        this.app = app;
        this.authUserRouter = new authUser_routes_1.default();
        this.userRouter = new user_routes_1.default();
        this.productRouter = new product_routes_1.default();
        this.productCategoryRouter = new product_category_routes_1.default();
        this.blogRouter = new blog_routes_1.default();
        this.blogCategoryRouter = new blog_category_routes_1.default();
        this.brandRouter = new brand_routes_1.default();
        this.productCommentRouter = new product_comment_routes_1.default();
        this.couponRouter = new coupon_routes_1.default();
        this.cartRouter = new cart_routes_1.default();
        this.colorRouter = new color_routes_1.default();
        this.enqRouter = new enq_routes_1.default();
        this.orderRouter = new order_routes_1.default();
        this.routes();
    }
    routes() {
        this.app.use("/api/auth", this.authUserRouter.router);
        this.app.use("/api/user", this.userRouter.router);
        this.app.use("/api/product", this.productRouter.router);
        this.app.use("/api/blog", this.blogRouter.router);
        this.app.use("/api/product-category", this.productCategoryRouter.router);
        this.app.use("/api/blog-category", this.blogCategoryRouter.router);
        this.app.use("/api/brand", this.brandRouter.router);
        this.app.use("/api/product-comment", this.productCommentRouter.router);
        this.app.use("/api/coupon", this.couponRouter.router);
        this.app.use("/api/cart", this.cartRouter.router);
        this.app.use("/api/color", this.colorRouter.router);
        this.app.use("/api/enq", this.enqRouter.router);
        this.app.use("/api/order", this.orderRouter.router);
    }
}
exports.default = ApiRoutes;
