import mongoose, { Schema } from "mongoose";
import {mongoosePagination} from "mongoose-paginate-ts"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const BlogSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true,
        unique : true
    },
    description : {
        type : String,
        required : true,
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : "tbl_blog_category"
    },
    slug : {
        type : String,
        required : true,
    },
    numViews : {
        type : [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"tbl_users"
        }],
        required : true,
    },
    likes : {    
        type : [{
            type:mongoose.Schema.Types.ObjectId,
            ref : "tbl_users"
        }],
    },
    disLikes : {    
        type : [{
            type:mongoose.Schema.Types.ObjectId,
            ref : "tbl_users"
        }],
    },
    images : {
        type : [
            {
                url : String,
                public_id : String
            }
        ],
        default: [{url : "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"}]
    },
    active : {
        type : Boolean,
        default : true
    },
    author : {
        type : String,
        default : "Admin"
    }
} , {timestamps : true})

BlogSchema.plugin(mongoosePagination)
BlogSchema.plugin(mongooseAggregatePaginate );
BlogSchema.index({title : 1})
export default BlogSchema


