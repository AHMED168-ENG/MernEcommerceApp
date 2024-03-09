import { Schema } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

const ColorSchema = new Schema({
    name : {
        type : String,
        required : true,    
        trim : true,
        uppercase: true
    },
    active : {
        type : Boolean,
        default:true,    
    },
} , {timestamps : true})
ColorSchema.index({"name" : 1} )
ColorSchema.plugin(mongoosePagination)
export default ColorSchema














