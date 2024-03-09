import mongoose from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type ColorType= mongoose.Document & {
    name : string,       
    active : boolean,
}

export interface colorPaginateModel extends Pagination<ColorType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

