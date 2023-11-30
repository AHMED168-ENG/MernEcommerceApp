import mongoose from "mongoose"
import { Pagination } from 'mongoose-paginate-ts';

export type BlogType = mongoose.Document & {
    title : string,
    description : Text,
    category : string,
    slug : string,
    numViews : [mongoose.Types.ObjectId],
    likes : [mongoose.Types.ObjectId],
    disLikes : [mongoose.Types.ObjectId],
    images : [{   
            url : string,
            public_id : string
        }],
    author : string, 
    active : boolean
} 

export interface BlogPaginateModel extends Pagination<BlogType> {
    aggregatePaginate(aggregation: any , arg1: { limit: any; page: any; }): unknown;
}

