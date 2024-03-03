import bcrypt from 'bcrypt';
import { PaginationModel } from 'mongoose-paginate-ts';
import jwt from "jsonwebtoken";
import tbl_user from "../../model/users";
import {Config} from "../../config/config";
import { UserType } from '../../types/user';
import { ImageOperations, Others } from '../../helper/helper';
import buildError from '../../helper/ErrorBuilder';
import httpStatus from 'http-status';
import { UploadResult } from '../../types/cloudenary';




export default class UserService {
    public async generateToken(id:string) {
        return jwt.sign({id} , Config.SECRET_KEY , {expiresIn : "9999d"})
    }

    public async refreshToken(id:string) {
        return jwt.sign({id} , Config.SECRET_KEY , {expiresIn : "9999d"})
    }

    public async create(body : any) : Promise<UserType> {
        const user : any = await tbl_user.create(body)
        return user
    }
    
    public async updateOne(_id:string , body:any) : Promise<UserType> {
        const user = await tbl_user.findOneAndUpdate({_id}  , body , {new : true})
        console.log(user)
        return user
    }
    
    public async find( query : any , id:string) : Promise<PaginationModel<UserType>> { 
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , ["firstName" , "lastName" , "email"])
        const user = await tbl_user.paginate({limit : query.limit , page: query.page , query : {_id : {$ne : id} , ...newQuery} , select :  {password : 0} , sort : {createdAt : -1}}) 
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
        const user = await tbl_user.findOne({_id })
        return user
    }
    
    public async findWishList(_id:string) : Promise<UserType> {
        const user = await tbl_user.findOne({_id } , {password : 0}).populate("wishlist")
        return user
    }
    
    public async deleteOne(_id:string) {
        let user : UserType = await this.findOne(_id)
        let imageOperations = new ImageOperations()
        if(user.image.public_id) imageOperations.deleteFilesCloud(user.image.public_id)
        await tbl_user.deleteOne({_id })
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

    public async uploadImage(file:any , dimension : {width : number , height:number} , id : string) : Promise<UserType> {
        if(!file) throw buildError(httpStatus.FORBIDDEN , "chose your user image")
        let user : UserType = await this.findOne(id)
        let imageOperations = new ImageOperations()
        let imagesFormate = await imageOperations.formateImage(file , {width : +dimension.width , height : +dimension.height})
        let imagesCloud : UploadResult = await imageOperations.uploadFilesCloud(imagesFormate , "user")       
        let publicId : string = user.image.public_id
        if(publicId) await imageOperations.deleteFilesCloud(publicId)
        let image = {url : imagesCloud.url , public_id : imagesCloud.public_id}
        return await this.updateOne(id , {$set : {image : image}})
    }

}
