import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";

const BrandSchema = new Schema({
    title : {
        type : String,
        required : true,    
        trim : true,
    },
    active : {
        type : Boolean,
        default : true
    },
} , {timestamps : true})
BrandSchema.index({"title" : 1} )
BrandSchema.plugin(mongoosePagination)
BrandSchema.plugin(mongooseAggregatePaginate );
export default BrandSchema














