import mongoose from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type ProductCategoryType= mongoose.Document & {
    title : string,
    parentId : mongoose.Types.ObjectId,
    active : boolean
}

export interface ProductCategoryPaginateModel extends Pagination<ProductCategoryType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

