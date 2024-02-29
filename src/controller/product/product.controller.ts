import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ProductService from '../../services/product/product.services';
import { Others } from "../../helper/helper";
interface HandlerRequest extends Request {
    query: {
        page: string,
        limit: string,
        sort: string,
    },
    user : {id:string}
}

export default class ProductController {
    constructor() {}

    /** ------------------------------------------------------  
     * @desc create product 
     * @route /product/create
     * @method post
     * @access private admin
     /**  ------------------------------------------------------  */
    public async create(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {body} = req
            const productService : ProductService = new ProductService()
            const others : Others = new Others()
            body.slug = await others.makeSlug(body.title)
            const product = await productService.create(body)
            return res.status(httpStatus.CREATED).json(product)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find all products
     * @route /product/find all
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async find(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const query = req.query
            const productService : ProductService = new ProductService()
            const products = await productService.find(query ,  ["category" , "rate" , "title" , "brand" , "price"])
            return res.status(httpStatus.OK).json(products)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc find product
     * @route /product/find one
     * @method get
     * @access private admin
     /**  ------------------------------------------------------  */
    public async findOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const productService : ProductService = new ProductService()
            const product = await productService.findOneWithAggregate(id)
            return res.status(httpStatus.OK).json(product)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc update product
     * @route /product/update one
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async updateOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {body} = req
            const others : Others = new Others()
            body.slug = await others.makeSlug(body.title)
            const productService : ProductService = new ProductService()
            const product = await productService.updateOne(id , body)
            return res.status(httpStatus.OK).json(product)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc delete product
     * @route /product/delete one
     * @method delete
     * @access private admin
     /**  ------------------------------------------------------  */
    public async deleteOne(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const productService : ProductService = new ProductService()
            await productService.deleteOne(id)
            return res.status(httpStatus.OK).json({
                success : true
            })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc activation product
     * @route /product/activation-product
     * @method put
     * @access private admin
     /**  ------------------------------------------------------  */
    public async activationProduct(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const productService : ProductService = new ProductService()
            let product = await productService.findOne(id)
            await productService.activation(id , {active : !product.active})
            return res.status(httpStatus.OK).json(product)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc add product to wishlist
     * @route /product/wishlist
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async addToWishList(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userId = req.user.id
            const productService : ProductService = new ProductService()
            let user = await productService.addToWishList(id , userId)
            return res.status(httpStatus.OK).json(user)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc add product to cart
     * @route /product/cart
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async addToCart(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            // const {id} = req.params
            // const userId = req.user.id
            // const productService : ProductService = new ProductService()
            // let user = await productService.addToCart(id , userId)
            // return res.status(httpStatus.OK).json({
            //     success : true,
            //     user
            // })
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc add product to wishlist
     * @route /product/wishlist
     * @method put
     * @access private user
     /**  ------------------------------------------------------  */
    public async addRate(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const userId = req.user.id
            const {start} = req.body
            const productService : ProductService = new ProductService()
            let user = await productService.addRate(id , userId , +start)
            return res.status(httpStatus.OK).json(user)
        } catch (error) {
            next(error)
        }
    }

    /** ------------------------------------------------------  
     * @desc upload product images
     * @route /product/upload-image/:id
     * @method post
     * @access private all
     /**  ------------------------------------------------------  */
     public async uploadImage(req : HandlerRequest , res : Response , next : NextFunction) {
        try {
            const {id} = req.params
            const {files} = req
            const {width , height} = req.body
            const productService : ProductService = new ProductService()
            let product = await productService.uploadImage(files , {width , height} , id)
           return res.status(httpStatus.OK).json(product )
        } catch (error) {
            next(error)
        }
    }
}