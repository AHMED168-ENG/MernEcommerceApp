import mongoose from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type EnqType= mongoose.Document & {
    name : string,       
    email : string,       
    mobile : string,       
    comment : string,       
    status : string,       
}

export interface EnqPaginateModel extends Pagination<EnqType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

