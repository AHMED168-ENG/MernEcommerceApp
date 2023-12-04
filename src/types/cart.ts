import mongoose, { Schema } from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type CartType= mongoose.Document & {
    products : {
        product_id : Schema.Types.ObjectId,
        count : number,
        color : string
    }[],
    total_price : number,
    price_after_discount : number,
    user_id : Schema.Types.ObjectId,
}

export interface CartPaginateModel extends Pagination<CartType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

