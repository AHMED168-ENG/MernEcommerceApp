import mongoose, { Mongoose, Schema, Types, mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { mongoosePagination } from "mongoose-paginate-ts";
import { DISCOUNT_TYPE } from "../../../constant/product";

const productSchema = new Schema({
    title : {
        type : String,
        required : true,    
        trim : true,
    },
    description : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    price : {
        type : Number,
        required: true,
    },
    category : {
        type : mongoose.Types.ObjectId,
        required: true,
        ref : "tbl_product_category"
    },
    brands : {
        type : [String],
        default : [],  
    },
    quantity : {
        type : Number,
        default : 0,
    },
    discount : {
        type:Number,
        default : 0
    },
    discount_type : {
        type: String,
        enum : DISCOUNT_TYPE,
        default : "amount"
    },
    sold : {
        type : Number,
        default : 0,
        // select : false
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
    colors : {
        type : [Types.ObjectId],
        default : [],
        ref : "tbl_colors"
    },
    tags : {
        type : [String],
        default : [],
    },
    active : {
        type : Boolean,
        default : true
    },
    rating : {
        type : [
            {
                rate : Number , 
                userId : {type : mongoose.Schema.Types.ObjectId , ref : "tbl_user"}
            }
        ],
        default : []
    },

} , {timestamps : true})
productSchema.index({"title" : 1} )
productSchema.plugin(mongoosePagination)
productSchema.plugin(mongooseAggregatePaginate );
export default productSchema














