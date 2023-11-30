import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";

const ProductCommentSchema = new Schema({
    comment : {
        type : String,
        required : true,    
        trim : true,
    },
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "tbl_product",
        required : true
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "tbl_user",
        required : true
    },
    likes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "tbl_user",
        default : []
    },
    dis_likes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "tbl_user",
        default : []
    },
} , {timestamps : true})
ProductCommentSchema.index({"comment" : 1} )
ProductCommentSchema.plugin(mongoosePagination)
ProductCommentSchema.plugin(mongooseAggregatePaginate );
export default ProductCommentSchema














