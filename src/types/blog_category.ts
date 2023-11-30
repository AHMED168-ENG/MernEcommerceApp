import mongoose from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type BlogCategoryType= mongoose.Document & {
    title : string,
    parentId : mongoose.Types.ObjectId,
    active : boolean
}

export interface BlogCategoryPaginateModel extends Pagination<BlogCategoryType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

