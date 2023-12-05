import express from 'express';
import AuthUserRouter from './auth/authUser.routes';
import UserRouter from './user/user.routes';
import ProductRouter from './product/product.routes';
import BlogRouter from './blog/blog.routes';
import ProductCategoryRouter from './product_category/product_category.routes';
import BlogCategoryRouter from './blog_category/blog_category.routes';
import BrandRouter from './brand/brand.routes';
import ProductCommentRouter from './product_comment/product_comment.routes';
import CouponRouter from './coupon/coupon.routes';
import CartRouter from './cart/cart.routes';
import ColorRouter from './color/color.routes';
import EnqRouter from './enq/enq.routes';


class ApiRoutes {
    private readonly authUserRouter: AuthUserRouter = new AuthUserRouter()
    private readonly userRouter: UserRouter = new UserRouter()
    private readonly productRouter: ProductRouter = new ProductRouter()
    private readonly productCategoryRouter: ProductCategoryRouter = new ProductCategoryRouter()
    private readonly blogRouter: BlogRouter = new BlogRouter()
    private readonly blogCategoryRouter: BlogCategoryRouter = new BlogCategoryRouter()
    private readonly brandRouter: BrandRouter = new BrandRouter()
    private readonly productCommentRouter: ProductCommentRouter = new ProductCommentRouter()
    private readonly couponRouter: CouponRouter = new CouponRouter()
    private readonly cartRouter: CartRouter = new CartRouter()
    private readonly colorRouter: ColorRouter = new ColorRouter()
    private readonly enqRouter: EnqRouter = new EnqRouter()

    constructor(
        private app: express.Application,
    ) {
        this.routes()
    }
    routes() {
        this.app.use("/api/auth" , this.authUserRouter.router)
        this.app.use("/api/user" , this.userRouter.router)
        this.app.use("/api/product" , this.productRouter.router)
        this.app.use("/api/blog" , this.blogRouter.router)
        this.app.use("/api/product-category" , this.productCategoryRouter.router)
        this.app.use("/api/blog-category" , this.blogCategoryRouter.router)
        this.app.use("/api/brand" , this.brandRouter.router)
        this.app.use("/api/product-comment" , this.productCommentRouter.router)
        this.app.use("/api/coupon" , this.couponRouter.router)
        this.app.use("/api/cart" , this.cartRouter.router)
        this.app.use("/api/color" , this.colorRouter.router)
        this.app.use("/api/enq" , this.enqRouter.router)
    }
}

export default ApiRoutes


