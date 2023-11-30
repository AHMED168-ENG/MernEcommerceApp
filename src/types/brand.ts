import mongoose from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type BrandType= mongoose.Document & {
    title : string,
    active : boolean
}

export interface BrandPaginateModel extends Pagination<BrandType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

