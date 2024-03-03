import mongoose from "mongoose"

export type UserType = mongoose.Document & {
    firstName : string,
    lastName : string,
    email : string,
    mobile : string,
    password : string,  
    role : string,      
    isBlocked : boolean,
    refreshToken : string,
    // cart : [mongoose.Types.ObjectId],
    address : string,
    wishlist : [mongoose.Types.ObjectId],
    image:{url : string , public_id : string},
    active : boolean,
}