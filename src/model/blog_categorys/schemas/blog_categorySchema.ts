import mongoose, { Mongoose, Schema, mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";

const blogCategorySchema = new Schema({
    title : {
        type : String,
        required : true,    
        trim : true,
    },
    parentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "tbl_blog_category",
        default : null
    },
    active : {
        type : Boolean,
        default : true
    },
} , {timestamps : true})
blogCategorySchema.index({"title" : 1} )
blogCategorySchema.plugin(mongoosePagination)
blogCategorySchema.plugin(mongooseAggregatePaginate );
export default blogCategorySchema














