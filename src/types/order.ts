import mongoose, { Schema } from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type OrderType= mongoose.Document & {
    products : [{
        product_id : Schema.Types.ObjectId,
        count : number,
        color : string
    }],
    payment_intent : {},
    order_status : string,
    ordered_by : Schema.Types.ObjectId,
}

export interface OrderPaginateModel extends Pagination<OrderType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

