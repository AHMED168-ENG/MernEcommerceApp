import mongoose from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type couponType= mongoose.Document & {
    name : string,
    discount : number,
    discount_type : string,
    expiration : Date,
}

export interface CouponPaginateModel extends Pagination<couponType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

