import mongoose from "mongoose";
import {mongoosePagination} from "mongoose-paginate-ts"
import { userRoles } from "../../../constant/user";

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        enum : userRoles,
        type : String,
        default : "User"
    },
    isBlocked : {
        type : Boolean,
        default: false
    },
    refreshToken : {
        type : String,
    },
    // cart : [{
    //     type : mongoose.Schema.Types.ObjectId , 
    //     ref : "tbl_product",
    //     default : [],
    // }],
    address : String,
    wishlist : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "tbl_product",
            default : []
        }
    ],
    passwordChangeAt : {
        type : Date,
    },
    passwordResetToken : {
        type : String,
    },
    passwordResetExpiration : {
        type : Date,
    },
    image : {
        type : {
            url : String,
            public_id : String
        },
        default: {url : "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"}
    },
    active : {
        type : Boolean,
        default : false
    },
} , {timestamps : true})

UserSchema.plugin(mongoosePagination)
UserSchema.index({email : 1})
export default UserSchema


