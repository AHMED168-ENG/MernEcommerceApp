import { PaginationModel } from 'mongoose-paginate-ts';
import { Others } from '../../helper/helper';
import tbl_blog_category from '../../model/blog_categorys';
import { PipelineStage, ObjectId, Types } from 'mongoose';
import { BlogCategoryType } from '../../types/blog_category';




export default class BlogCategoryService {

    public async create(body : any) : Promise<BlogCategoryType> {
        const blogCategory = await tbl_blog_category.create(body)
        return blogCategory
    }
    
    public async updateOne(_id:string , body:any) : Promise<BlogCategoryType> {
        const blogCategory = await tbl_blog_category.findByIdAndUpdate(_id  , {$set : body} , {new : true})
        return blogCategory
    }
    
    public async find(query , sanitize: string[]) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , sanitize)
        let newSort = await others.sortDocs(sort)
        let aggregateStage : PipelineStage[] = [
            {$graphLookup: {
                from: 'tbl_blog_categories',
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
        let aggregate = tbl_blog_category.aggregate(aggregateStage)
        const blogCategory = await tbl_blog_category.aggregatePaginate(aggregate,{limit , page }) 
        return blogCategory 
    }
    
    public async findOne(_id:string) : Promise<BlogCategoryType> {
        let aggregateStage : PipelineStage[] = [
            {$graphLookup: {
                from: 'tbl_blog_categories',
                startWith: '$parentId',
                connectFromField: 'parentId',
                connectToField: '_id',
                as: 'parents',
                maxDepth: 10,
            }},
            {$match : {_id : new Types.ObjectId(_id)}},
        ] 
        const blogCategory = await tbl_blog_category.aggregate(aggregateStage)
        return blogCategory[0]
    }

    public async findWithQuery(query: any ) : Promise<BlogCategoryType> {
        const blogCategory = await tbl_blog_category.findOne(query)
        return blogCategory
    }
    
    public async activation(_id:string , body : {active : boolean}) : Promise<BlogCategoryType> {
        let blogCategory = await this.updateOne(_id , body)
        return blogCategory
    }
    
    public async deleteOne(_id:string) {
        const blogCategory = await tbl_blog_category.deleteOne({_id })
        return blogCategory
    }

}
