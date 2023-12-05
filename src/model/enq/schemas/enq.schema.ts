import { Schema } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";
import { ENQ_STATUS } from "../../../constant/enq";

const EnqSchema = new Schema({
    name : {
        type : String,
        required : true,    
        trim : true,
        uppercase: true
    },
    email : {
        type : String,
        required : true,    
        trim : true,
        uppercase: true
    },
    mobile : {
        type : String,
        required : true,    
        trim : true,
    },
    comment : {
        type : String,
        required : true,    
        trim : true,
    },
    status : {
        type : String,
        enum : ENQ_STATUS,
        default : "submitted"
    },
} , {timestamps : true})
EnqSchema.index({"name" : 1} , {unique : false} )
EnqSchema.plugin(mongoosePagination)
export default EnqSchema














