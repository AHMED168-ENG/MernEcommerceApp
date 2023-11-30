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
            color : String,
        },
    ],
    total_price : Number,
    price_after_discount : Number,
    user_id: {
        type: Schema.Types.ObjectId,
        ref : "tbl_users",
        required : true
    },
} , {timestamps : true})
OrderSchema.plugin(mongoosePagination)
OrderSchema.plugin(mongooseAggregatePaginate);
export default OrderSchema














