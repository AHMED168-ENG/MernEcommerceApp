import mongoose from "mongoose";
import UserSchema from "./schemas/userSchema";
import HashPasswordHook from "../users/hook/index"
import comparePasswordMethods from "./methods/index";
import {Pagination } from "mongoose-paginate-ts"
import { UserType } from "../../types/user";


HashPasswordHook(UserSchema)
comparePasswordMethods(UserSchema)

 const tbl_user: Pagination<UserType> = mongoose.model<UserType, Pagination<UserType>>("tbl_user", UserSchema);
 export default tbl_user