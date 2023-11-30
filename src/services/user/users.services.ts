import bcrypt from 'bcrypt';
import { PaginationModel } from 'mongoose-paginate-ts';
import jwt from "jsonwebtoken";
import tbl_user from "../../model/users";
import {Config} from "../../config/config";
import { UserType } from '../../types/user';




export default class UserService {
    public async generateToken(id:string) {
        return jwt.sign({id} , Config.SECRET_KEY , {expiresIn : "1d"})
    }

    public async refreshToken(id:string) {
        return jwt.sign({id} , Config.SECRET_KEY , {expiresIn : "3d"})
    }

    public async create(body : any) : Promise<UserType> {
        const user : any = await tbl_user.create(body)
        return user
    }
    
    public async updateOne(_id:string , body:any) : Promise<UserType> {
        const user = await tbl_user.findOneAndUpdate({_id}  , body , {new : true})
        return user
    }
    
    public async find(limit : number , page : number) : Promise<PaginationModel<UserType>> { 
        const user = await tbl_user.paginate({limit , page , select :  {password : 0}}) 
        return user 
    }
    
    public async findWithEmail(email:string) : Promise<UserType> {
        const user = await tbl_user.findOne({email })
        return user
    }
    
    public async findWithQuery(query:any) : Promise<UserType[]> {
        const user = await tbl_user.find(query ,  {password : 0})
        return user
    }
    
    public async findOne(_id:string) : Promise<UserType> {
        const user = await tbl_user.findOne({_id } , {password : 0})
        return user
    }
    
    public async findWishList(_id:string) : Promise<UserType> {
        const user = await tbl_user.findOne({_id } , {password : 0}).populate("wishlist")
        return user
    }
    
    public async deleteOne(_id:string) {
        const user = await tbl_user.deleteOne({_id })
        return user
    }
    
    public async updatePassword(password:string , _id : string) {
        const user = await tbl_user.findOne({_id})
        user.password = password
        return user.save()
        
    }

    public async activeMyAccount(_id : string) {
        return await this.updateOne(_id , {active : true})
        
    }
}
