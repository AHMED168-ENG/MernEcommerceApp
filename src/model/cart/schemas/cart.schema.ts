import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";

const CartSchema = new Schema({
    products : [
        {
            product_id : {
                type : Schema.Types.ObjectId,
                ref:"tbl_product"
            },
            count : Number,
            color : String,
            _id:false
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
CartSchema.plugin(mongoosePagination)
CartSchema.plugin(mongooseAggregatePaginate);
export default CartSchema














