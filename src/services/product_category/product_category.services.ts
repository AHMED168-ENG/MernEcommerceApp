import { PaginationModel } from 'mongoose-paginate-ts';
import { Others } from '../../helper/helper';
import tbl_product_category from '../../model/product_categorys';
import { ProductCategoryType } from '../../types/product_category';
import { PipelineStage, ObjectId, Types } from 'mongoose';




export default class ProductCategoryService {

    public async create(body : any) : Promise<ProductCategoryType> {
        const productCategory = await tbl_product_category.create(body)
        return productCategory
    }
    
    public async updateOne(_id:string , body:any) : Promise<ProductCategoryType> {
        const productCategory = await tbl_product_category.findByIdAndUpdate(_id  , {$set : body} , {new : true})
        return productCategory
    }
    
    public async find(query , sanitize: string[]) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , sanitize)
        let newSort = await others.sortDocs(sort)
        let aggregateStage : PipelineStage[] = [
            {
                $lookup : {
                    from : "tbl_product_categories",
                    as : "mainCategory",
                    foreignField : "parentId",
                    localField : "_id",
                }
            },
            {
                $unwind : {
                    path : "$mainCategory",
                    "preserveNullAndEmptyArrays": true
                },
            },
            {$graphLookup: {
                from: 'tbl_product_categories',
                startWith: '$parentId',
                connectFromField: 'parentId',
                connectToField: '_id',
                as: 'parents',
                maxDepth: 10,
                // depthField: 'depth'
            }},
            {$match : newQuery},
            {$sort : newSort}
        ] 
        let aggregate = tbl_product_category.aggregate(aggregateStage)
        const productCategory = await tbl_product_category.aggregatePaginate(aggregate,{limit , page }) 
        return productCategory 
    }
    
    public async findOne(_id:string) : Promise<ProductCategoryType> {
        let aggregateStage : PipelineStage[] = [
            {$graphLookup: {
                from: 'tbl_product_categories',
                startWith: '$parentId',
                connectFromField: 'parentId',
                connectToField: '_id',
                as: 'parents',
                maxDepth: 10,
            }},
            {$match : {_id : new Types.ObjectId(_id)}},
        ] 
        const productCategory = await tbl_product_category.aggregate(aggregateStage)
        return productCategory[0]
    }

    public async findWithQuery(query: any ) : Promise<ProductCategoryType> {
        const productCategory = await tbl_product_category.findOne(query)
        return productCategory
    }
    
    public async activation(_id:string , body : {active : boolean}) : Promise<ProductCategoryType> {
        let productCategory = await this.updateOne(_id , body)
        return productCategory
    }
    
    public async deleteOne(_id:string) {
        const productCategory = await tbl_product_category.deleteOne({_id })
        return productCategory
    }

}
