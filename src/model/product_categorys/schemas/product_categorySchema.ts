import mongoose, { Mongoose, Schema, mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";

const productCategorySchema = new Schema({
    title : {
        type : String,
        required : true,    
        trim : true,
    },
    parentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "tbl_product_category",
        default : null
    },
    active : {
        type : Boolean,
        default : true
    },
} , {timestamps : true})
productCategorySchema.index({"title" : 1} )
productCategorySchema.plugin(mongoosePagination)
productCategorySchema.plugin(mongooseAggregatePaginate );
export default productCategorySchema














