import { UploadResult } from './../../types/cloudenary';
import { PaginationModel } from 'mongoose-paginate-ts';
import { ProductType } from '../../types/product';
import tbl_product from '../../model/product';
import { ImageOperations, Others } from '../../helper/helper';
import UserService from '../user/users.services';
import { UserType } from '../../types/user';
import { PipelineStage, Types } from 'mongoose';
import buildError from '../../helper/ErrorBuilder';
import httpStatus from 'http-status';




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
    
    public async findAllWithQuery(query: any ) : Promise<ProductType[]> {
        const products = await tbl_product.find(query)
        return products
    }
    public async bulkWrite(query: any ) : Promise<any> {
        return await tbl_product.bulkWrite(query)
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


    public async addRate(productId:string , userId : string , start : number) : Promise<ProductType> {
        let product = await this.findOne(productId)
        if(!product) throw buildError(httpStatus.NOT_FOUND , "product not found")

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
        if(!files || !files.length) throw buildError(httpStatus.FORBIDDEN , "chose your product images")
        let product : ProductType = await this.findOne(id)
        let imageOperations = new ImageOperations()
        let imagesFormate = await imageOperations.formateImages(files , {width : +dimension.width , height : +dimension.height})
        let imagesCloud = await imageOperations.uploadFilesCloud(imagesFormate , "product")       
        let publicIds : string[] = [] 
        publicIds = product.images.map(ele => ele.public_id)
        if(publicIds.length) await imageOperations.deleteFilesCloud(publicIds)
        let images = []
        images = imagesCloud.map((ele : UploadResult) => {
            return {url : ele.url , public_id : ele.public_id}
        })
        return await this.updateOne(id , {$set : {images : images}})
    }

    private getStage(newQuery , newSort) {
        return [
            {$match : newQuery},    
            {
                $lookup : {
                    from:"tbl_product_categories",
                    foreignField : "_id",
                    localField : "category",
                    as : "category",
                    pipeline : [{
                        $project : {
                            "title" : 1
                        }
                    }]
                }
            },
            {$unwind : {path : "$category" , preserveNullAndEmptyArrays : true }},
            {
                $lookup : {
                    from:"tbl_brands",
                    foreignField : "_id",
                    localField : "brands",
                    as : "brands",
                    pipeline : [
                    {$match : {
                        active : true
                    }},    
                    {
                        $project : {
                            "title" : 1,
                        }
                    }]
                }
            },
            {
                $lookup : {
                    from:"tbl_colors",
                    foreignField : "_id",
                    localField : "colors",
                    as : "colors",
                    pipeline : [   
                    {
                        $project : {
                            "name" : 1,
                        }
                    }]
                }
            },
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
                    discount : {$first : "$discount"},
                    discount_type : {$first : "$discount_type"},
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
                    quantity : "$quantity",
                    sold : "$sold",
                    discount_type : "$discount_type",
                    discount : "$discount",
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
