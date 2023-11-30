import mongoose from "mongoose";
import {mongoosePagination} from "mongoose-paginate-ts"

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
        type : String,
        default : "user"
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
    wishlist : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "tbl_product",
        default : []
    }],
    passwordChangeAt : {
        type : Date,
    },
    passwordResetToken : {
        type : String,
    },
    passwordResetExpiration : {
        type : Date,
    },
    active : {
        type : Boolean,
        default : false
    },
} , {timestamps : true})

UserSchema.plugin(mongoosePagination)
UserSchema.index({email : 1})
export default UserSchema


