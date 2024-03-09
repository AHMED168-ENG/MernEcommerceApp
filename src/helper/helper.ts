import sharp from 'sharp';
import path from 'path';
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import moment from "moment";
import slugify from "slugify"
import Cloudinary , {v2 as cloudinary} from 'cloudinary';
import fs = require("fs")

export class ImageOperations {
  constructor() {
    cloudinary.config({ 
      cloud_name: 'ahmed-zakys', 
      api_key: '657617286879229', 
      api_secret: 'AVjsexl9m9dmlnO3Th0iW2Sn5yQ' 
    });
  }

  public async uploadFilesCloud(file : any , folder : string) {
    let result : any = []
    if(Array.isArray(file)) {
      for(let x = 0 ; x < file.length ; x++) {
        result.push(await cloudinary.uploader.upload(file[x].filePath , {folder : `Ecommerce/${folder}`})) 
        fs.unlink(file[x].filePath , (err) => { if(err) throw new Error(err.message)})
      }
    } else {
      result = await cloudinary.uploader.upload(file.filePath , {folder : `Ecommerce/${folder}`})
      fs.unlink(file.filePath , (err) => { if(err) throw new Error(err.message)})
    }
    return result
  }

  public async deleteFilesCloud(publicId : string | string[]) {
    let result : any
    if(Array.isArray(publicId)) {
      result = cloudinary.api.delete_resources(publicId)
    } else {
      console.log(publicId)
      result = cloudinary.uploader.destroy(publicId)
    }
    return result
  }

  public async formateImage(file : Express.Multer.File, dimensions : {width : number , height : number}) {
    const fileName = Date.now() + "_" + file.originalname
    let filePath = path.join(__dirname , "../../assets/" + fileName)
    let fileFormate = await sharp(file.buffer).resize(dimensions.width , dimensions.height).toFormat("jpg", {quality : 90}).toFile(filePath)
    return {...fileFormate , fileName , filePath}
  }

  public async formateImages(files : [Express.Multer.File], dimensions : {width : number , height : number}) {
    let filesFormate = []
    for(let i = 0 ; i < files.length ; i++) {
      const fileName = Date.now() + "_" + files[i].originalname
      let filePath = path.join(__dirname , "../../assets/" + fileName)
      let fileFormate = await sharp(files[i].buffer).resize(dimensions.width , dimensions.height).toFormat("jpg" , {quality : 90}).toFile(filePath)
      filesFormate.push({...fileFormate , filePath , fileName})
    }
    return filesFormate
  }

  public uploadMulter() {
    const storage = multer.memoryStorage()
    // ---------- filter file
    const fileFilter = (req : Request, file, cb) => {
      if (!file.mimetype.startsWith("image")) {
        cb(
          {
            message: "unsupported file form",
            status: 400,
          },
          false
        );
      } else {
        cb(null, true);
      }
    };
    return multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: { fileSize: 1024 * 1024 * 2  },
    });
  }

}

/*------------------------------------ class start function -------------------------------*/
export class StartActions {
  public async startFunctionForDashboard(
    req: Request,
    res: Response,
    url: string,
    csrfToken: string
  ): Promise<void> {}
  public async startFunctionForSite(
    req: Request,
    res: Response,
    url: string,
    csrfToken: string
  ): Promise<void> {}
}
/*------------------------------------ class start function -------------------------------*/
/*------------------------------------ class others -------------------------------*/
export class Others {
  // git sum of array
  public getSumOfArray(array: {}[]): number {
    let totalRate = 0;
    array.forEach((ele: any) => {
      totalRate += ele.rate;
    });
    return totalRate;
  }

  /*--------------------- start formate date ---------------------*/
  public formateDate(date: string, type: string = "date") {
    if (type == "date") {
      return moment(date).format("YYYY-MM-DD");
    } else if ("hour") {
      return moment(date).format("hh-mm-ss");
    }
  }
  /*--------------------- end formateDate ---------------------*/

  /*--------------------- start check if exist ---------------------*/
  public async checkIfExist(id: string, table) {
    const document = await table.findOne({
      _id: id,
    });
    if (document) {
      return true;
    } else {
      return false;
    }
  }
  /*--------------------- end check if exist ---------------------*/

  /*--------------------- start sort ---------------------*/
  public async sortDocs(sort:string){
    let sortObject = {}
    if (sort) {
        let sortArray = sort.split(",")

        for (let i = 0; i < sortArray.length; i++) {
            sortObject[sortArray[i].split("@")[0]] = +sortArray[i].split("@")[1]
        }
        return sortObject
    }
    return { createdAt: -1 }
}
  /*--------------------- end sort ---------------------*/
  /*--------------------- start create slug ---------------------*/
  public async makeSlug(string:string){
      return slugify(string , {
        remove: /[$*_+~.()'"!\-:@]+/g,
      })
  }
  /*--------------------- end create slug ---------------------*/

  /*--------------------- start sanitize query ---------------------*/
  public async sanitizeQuery(query:string , sanitize : string[]){
    let queryObject : any = {}
    sanitize.forEach((ele) => {
      if(query[ele] && !["limit","page","sort"].includes(ele)) {
        queryObject[ele] = query[ele]
      }
    })
    queryObject = JSON.stringify(queryObject)
    queryObject = queryObject.replace(/\b(gte|gt|lte|lt)\b/g ,(match => `$${match}`))
    queryObject = queryObject.replace(/\b(regex)\b/g ,(match => `$${match}`))
    queryObject = JSON.parse(queryObject)
    return queryObject
  }
  /*--------------------- end sanitize query ---------------------*/

  /*--------------------- start move object from and to or ---------------------*/
  public async moveAndToOr(Object : any){
    let newObject = []
    for (const key in Object) {
      newObject.push({[key] : Object[key]})
    }
    return newObject.length ? {$or : newObject} : {}
  }
  /*--------------------- end move object from and to or ---------------------*/

}
