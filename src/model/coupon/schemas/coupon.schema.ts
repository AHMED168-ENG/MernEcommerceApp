import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";

const CouponSchema = new Schema({
    name : {
        type : String,
        required : true,    
        trim : true,
        uppercase: true
    },
    discount : {
        type : Number,
        default : 0
    },
    discount_type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
      },
    expiration: {
        type: Date,
        required: true,
    },
} , {timestamps : true})
CouponSchema.index({"name" : 1} )
CouponSchema.plugin(mongoosePagination)
CouponSchema.plugin(mongooseAggregatePaginate );
export default CouponSchema














