import { PaginationModel } from 'mongoose-paginate-ts';
import { ProductType } from '../../types/product';
import tbl_product from '../../model/product';
import { ImageOperations, Others } from '../../helper/helper';
import UserService from '../user/users.services';
import { UserType } from '../../types/user';
import { PipelineStage, Types } from 'mongoose';
import tbl_user from '../../model/users';




export default class ProductService {

    public async create(body : any) : Promise<ProductType> {
        const product = await tbl_product.create(body)
        return product
    }
    
    public async updateOne(_id:string , body:any) : Promise<ProductType> {
        const product = await tbl_product.findByIdAndUpdate(_id  , body , {new : true})
        return product
    }
    
    public async find(query , sanitize: string[] = []) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , sanitize)
        let newSort = await others.sortDocs(sort)
        let stages : PipelineStage[] = this.getStage(newQuery , newSort)
        let aggregation = tbl_product.aggregate(stages)
        const products = await tbl_product.aggregatePaginate(aggregation , {limit , page }) 
        return products 
    }
    
    public async findOneWithAggregate(_id:string) : Promise<any> {
        let stages : PipelineStage[] = this.getStage({_id : new Types.ObjectId(_id)} , {_id:1})
        const product = await tbl_product.aggregate(stages)
        return product
    }
    
    public async findOne(_id:string) : Promise<ProductType> {
        const product = await tbl_product.findOne({_id})
        return product[0]
    }
    

    public async findWithQuery(query: any ) : Promise<ProductType> {
        const product = await tbl_product.findOne(query)
        return product
    }
    
    public async activation(_id:string , body : {active : boolean}) : Promise<ProductType> {
        let product = await this.updateOne(_id , body)
        return product
    }
    
    public async deleteOne(_id:string) {
        const product = await tbl_product.deleteOne({_id })
        return product
    }

    public async addToWishList(productId:string , userId : string) : Promise<UserType> {
        const userService = new UserService()
        let user = await userService.findOne(userId)
        const inWallet = user.wishlist.find((id) => id.toString() == productId)
        if(!inWallet) {
            user = await userService.updateOne(userId , {$push : {wishlist : productId}})
        } else {
            user = await userService.updateOne(userId , {$pull : {wishlist : new Types.ObjectId(productId)}})
        }
        return user
    }   

    public async addToCart(productId:string , userId : string) : Promise<UserType> {
        const userService = new UserService()
        let user = await userService.findOne(userId)
        // const inWallet = user.cart.find((id) => id.toString() == productId)
        // if(!inWallet) {
        //     user = await userService.updateOne(userId , {$push : {cart : productId}})
        // } else {
        //     user = await userService.updateOne(userId , {$pull : {cart : new Types.ObjectId(productId)}})
        // }
        return user
    }   

    public async addRate(productId:string , userId : string , start : number) : Promise<ProductType> {
        let product = await this.findOne(productId)
        if(!product) throw new Error("product not found")
        const inRate = product.rating.find((id) => id.userId.toString() == userId)
        if(!inRate) {
            product = await this.updateOne(productId , {$push : {rating : {rate : start , userId}}})
        } else {
            product = await this.updateOne(productId , {$pull : {rating : inRate}})
        }
        product.save()
        return product
    }  
    
    public async uploadImage(files:any , dimension : {width : number , height:number} , id : string) : Promise<ProductType> {
        if(!files || !files.length) throw new Error("chose your product images")
        let product : ProductType = await this.findOne(id)
        let imageOperations = new ImageOperations()
        let imagesFormate = await imageOperations.formateImages(files , {width : +dimension.width , height : +dimension.height})
        let imagesCloud = await imageOperations.uploadFilesCloud(imagesFormate , "product")       
        let publicIds : string[] = [] 
        publicIds = product.images.map(ele => ele.public_id)
        await imageOperations.deleteFilesCloud(publicIds)
        let images = []
        images = imagesCloud.map(ele => {
            return {url : ele.url , public_id : ele.public_id}
        })
        return await this.updateOne(id , {$set : {images : images}})
    }

    private getStage(newQuery , newSort) {
        return [
            {$match : newQuery},    
            {$unwind : {path : "$rating" , preserveNullAndEmptyArrays : true }},
            {$group : {
                    _id : "$_id" , 
                    total: { $sum: "$rating.rate" }, 
                    count: { $sum: 1 } , 
                    title : {$first : "$title"},
                    description : {$first : "$description"},
                    slug : {$first : "$slug"},
                    price : {$first : "$price"},
                    category : {$first : "$category"},
                    brands : {$first : "$brands"},
                    quantity : {$first : "$quantity"},
                    sold : {$first : "$sold"},
                    images : {$first : "$images"},
                    colors : {$first : "$colors"},
                    rating : {$first : "$rating"},
                    active : {$first : "$active"},
                }
            },
            {
                $project: {
                    total_rate: { $divide: ["$total", "$count"] },
                    title : "$title",
                    description : "$description",
                    slug : "$slug",
                    price : "$price",
                    category : "$category",
                    brands : "$brands",
                    images : "$images",
                    colors : "$colors",
                    rating : {$cond : {if:{$eq : ["$rating" , null] } , then : 0 , else : "$rating"}},
                    active : "$active",
                }
            },
        
            {$sort : newSort}
        ]
    }
    
}
