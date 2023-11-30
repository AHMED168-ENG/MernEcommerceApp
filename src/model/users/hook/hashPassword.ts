
import bcrypt from "bcrypt"
import { Config } from "../../../config/config"
import { NextFunction } from "express"

export default function HashPassword (next:NextFunction , user) : void {
    if(user.isNew || user.password) {
        user.password = bcrypt.hashSync(user.password , +Config.SALT_ROUNDS)
    } else if(user.getUpdate().password) {
        user.setUpdate({password : bcrypt.hashSync(user.getUpdate().password , +Config.SALT_ROUNDS)})
    }
    next()
}

 