import mongoose from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type ProductCommentType= mongoose.Document & {
    comment : string,
    product_id : mongoose.Schema.Types.ObjectId,
    user_id : mongoose.Schema.Types.ObjectId,
    likes : [mongoose.Schema.Types.ObjectId],
    dis_likes : [mongoose.Schema.Types.ObjectId],
}

export interface ProductCommentPaginateModel extends Pagination<ProductCommentType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

