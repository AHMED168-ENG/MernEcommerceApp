import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";
import { ORDER_STATUS } from "../../../constant/product";

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
        enum: ORDER_STATUS,
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














