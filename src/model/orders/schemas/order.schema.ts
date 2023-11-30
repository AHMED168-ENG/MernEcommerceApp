import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";

const OrderSchema = new Schema({
    products : [
        {
            product_id : {
                type : Schema.Types.ObjectId,
                ref:"tbl_product"
            },
            count : Number,
            color : String
        }
    ],
    payment_intent : {},
    order_status: {
        type:String,
        enum: ["Not Proceed" , "Cash On Delivery" , "processing" , "Dispatch" , "Canceled" , "Delivered"],
        default:"Not Proceed"
      },
    ordered_by: {
        type: Schema.Types.ObjectId,
        ref : "tbl_users",
        required : true
    },
} , {timestamps : true})
OrderSchema.plugin(mongoosePagination)
OrderSchema.plugin(mongooseAggregatePaginate);
export default OrderSchema














