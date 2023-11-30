import { check , param} from "express-validator";
import { isValidObjectId } from "mongoose";
import tbl_user from "../../model/users";
import UserService from "../../services/user/users.services";
import passwordValidator from "password-validator"

export default class UserValidation {
    private email(id ?: boolean) {
        return check("email").isEmail().notEmpty().withMessage("Enter your email").isEmail().withMessage("this field accept email")
                .custom(async(userEmail , {req}) => {
                    const userService : UserService = new UserService()
                    let query : any = {email : userEmail}
                    if(id) {
                        query._id = {
                            $ne : req.params.id ?  req.params.id : req.user.id
                        }
                    }
                    const user = await userService.findWithQuery(query)
                    if(user.length) {
                        return Promise.reject("")
                    }
                    return true
                }).withMessage("this email already existed").trim().toLowerCase()
    }

    private loginEmail() {
        return check("email").notEmpty().withMessage("Enter your email").isEmail().withMessage("this field accept email")
                .custom(async(userEmail , {req}) => {
                    const userService : UserService = new UserService()
                    const user = await userService.findWithEmail(userEmail)
                    if(!user) {
                        return Promise.reject("")
                    }
                    return true
                }).withMessage("this email not correct").trim().toLowerCase()
    }

    private loginPassword() {
        return check("password").notEmpty().withMessage("enter your password")
    }

    private id() {
        return param("id").custom((val , {req}) => {
                    if(!isValidObjectId(val)) throw new Error()
                    return true
                }).withMessage("this is invalid user id param")
    }

    private firstName() {
        return check("firstName").notEmpty().withMessage("Enter your first name")
    }

    private mobile(id ?: boolean) {
        return check("mobile").notEmpty().withMessage("Enter your mobile")
        .custom(async(userMobile , {req}) => {
            const userService : UserService = new UserService()
            let query : any = {mobile:userMobile}
            if(id) {
                query._id = {
                    $ne : req.params.id ? req.params.id : req.user.id
                }
            }
            const user = await userService.findWithQuery(query)
            if(user.length) {
                return Promise.reject("")
            }
            return true
        }).withMessage("this mobile already existed")
    }

    private lastName() {
        return check("lastName").notEmpty().withMessage("Enter your last name")
    }

    private passwordLength() {
        return check("password").isLength({min : 10}).withMessage("your password length should be more than 10")
        
    }
    
    private password() {
        return check("password").custom((val : string , {req}) => {
            if(!val) return true
            let passValidator = new passwordValidator()
            passValidator
            .is()
            .min(8)
            .is()
            .max(20)
            .is()
            .lowercase(2)
            .is()
            .uppercase(1)
            .has()
            .digits(2)
            .has()
            .symbols(2)
            if(!passValidator.validate(val)) {
                throw new Error("")
            }
            return true
        }).withMessage("password should contain lower case and upper case and should be minimum 8 and should be max 20 and should contain at lest 2 symbols and special character")
        
    }

    public createUser() {
        return [
            this.email(),
            this.firstName(),
            this.lastName(),
            this.passwordLength(),
            this.password(),
            this.mobile(),
        ]
    }

    public updateUser() {
        return [
            this.email(true),
            this.firstName(),
            this.lastName(),
            this.password(),
            this.mobile(true),
            this.id(),
        ]
    }

    public updateProfile() {
        return [
            this.email(true),
            this.firstName(),
            this.lastName(),
            this.password(),
            this.mobile(true),
        ]
    }

    public loginUser() {
        return [
            this.loginPassword(),
            this.loginEmail(),
        ]
    }

    public resetPassword() {
        return [
            this.passwordLength(),
            this.password()
        ]
    }

    private emailForgetPassword() {
        return check("email").notEmpty().withMessage("Enter your email").isEmail().withMessage("this field accept email")
                .custom(async(userEmail , {req}) => {
                    const userService : UserService = new UserService()
                    const user = await userService.findWithEmail(userEmail)
                    if(!user) {
                        return Promise.reject("")
                    }
                    return true
                }).withMessage("this email not register").trim().toLowerCase()
    }
    public forgetPassword() {
        return [
            this.emailForgetPassword()
        ]
    }
}