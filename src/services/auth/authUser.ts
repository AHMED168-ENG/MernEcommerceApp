


import {Config} from "../../config/config";
import UserService from '../user/users.services';
import { SendMails } from '../../mail/mail';
import buildError from '../../helper/ErrorBuilder';
import httpStatus from 'http-status';
import Crypto from "crypto"


export default class AuthService {
    public async register(body : any) {
        const userService : UserService = new UserService()
        const sendMails : SendMails = new SendMails()  
        const user : any = await userService.create(body)       
        sendMails.send({
            email : user.email,
            fName : user.firstName,
            lName : user.lastName,
            subject : "active your account please ",
            url : `http://localhost:${Config.port}/api/user/active-my-account/${user.id} ` ,
        })
        return user
    }
    
    public async forgetPassword(email:string) {
        const userService : UserService = new UserService()
        const sendMails : SendMails = new SendMails()
        let user : any = await userService.findWithEmail(email)
        const token = await user.createPasswordResetToken()
        await sendMails.send({
            email : user.email,
            fName : user.firstName,
            lName : user.lastName,
            subject : "Reset You Password 😇",
            url : `http://localhost:${Config.port}/${token} ` ,
        })
        user.save()
        return token
    }
    
    public async resetPassword(password : string , token : string) {
        const userService : UserService = new UserService()
            const sendMails : SendMails = new SendMails()         
            token = Crypto.createHash("sha256").update(token).digest("hex")
            const user : any = (await userService.findWithQuery({passwordResetToken : token , passwordResetExpiration : {$gt : Date.now()}}))[0]
            if(!user) throw buildError(httpStatus.FORBIDDEN , "your token is expired go back and do process again")
            user.password = password
            user.passwordResetExpiration = null
            user.passwordResetToken = null
            user.passwordChangeAt = Date.now()
            user.save().then(() => {
                sendMails.send({
                    email : user.email,
                    fName : user.firstName,
                    lName : user.lastName,
                    subject : "your password reset successful",
                })
            })
            return user
    }
    
    public async updatePassword(password : string , id : string) {
        const userService : UserService = new UserService()
        return await userService.updatePassword(password , id)
    }
}
