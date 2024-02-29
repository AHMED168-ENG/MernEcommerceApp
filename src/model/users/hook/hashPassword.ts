
import bcrypt from "bcrypt"
import { Config } from "../../../config/config"
import { NextFunction } from "express"

export default function HashPassword (next:NextFunction , user) : void {
    if(user.isNew || user.password) {
        user.password = bcrypt.hashSync(user.password , +Config.SALT_ROUNDS)
    } else if(user.getUpdate().password) {
        this.setUpdate({...this.getUpdate() , password : bcrypt.hashSync(this.getUpdate().password , +Config.SALT_ROUNDS)})
    }
    next()
}

 