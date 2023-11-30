import mongoose from "mongoose"
import { Pagination } from "mongoose-paginate-ts";


export type ProductType= mongoose.Document & {
    title : string,
    description : string,
    slug : string,
    price : number,
    category : [mongoose.Schema.Types.ObjectId],
    brands : [string],
    quantity : number,
    sold : number,
    images : [{   
        url : string,
        public_id : string
    }],
    colors : [string],
    rating : [{rate : mongoose.Schema.Types.ObjectId , userId : mongoose.Schema.Types.ObjectId}], 
    active : boolean
}

export interface ProductPaginateModel extends Pagination<ProductType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

