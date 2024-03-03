import { BlogType } from '../../types/blog';
import tbl_blog from '../../model/blog';
import { ImageOperations, Others } from '../../helper/helper';
import mongoose, { PipelineStage , Types} from 'mongoose';




export default class BlogService {

    public async create(body : any) : Promise<BlogType> {
        const blog = await tbl_blog.create(body)
        return blog
    }
    
    public async updateOne(_id:string , body:any) : Promise<BlogType> {
        const blog = await tbl_blog.findByIdAndUpdate(_id  , body , {new : true})
        return blog
    }
    
    public async find(query : any , sanitize: string[] ) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , ["category" , "rate" , "title" ])
        let newSort = await others.sortDocs(sort)
        let aggregate : PipelineStage[] = [
            {
                $lookup : {
                    from:"tbl_blog_categories",
                    foreignField : "_id",
                    localField : "category",
                    as : "category",
                }
            },
            {
                $unwind : {
                    path : "$category",
                    preserveNullAndEmptyArrays : true
                }
            },
            {
                $lookup : {
                    from:"tbl_users",
                    foreignField : "_id",
                    localField : "numViews",
                    as : "numViews",
                }
            },
            {$addFields : {
                "isLiked" : {
                    $cond : {
                        if : {$in : [new Types.ObjectId(query.id) , "$likes"]},
                        then:true,
                        else:false
                    }
                }
            }},
            {
                $lookup : {
                    from:"tbl_users",
                    foreignField : "_id",
                    localField : "likes",
                    as : "likes",
                }
            },
            {$match : newQuery},
            {$sort : newSort},
      
        ]
        let aggregation = tbl_blog.aggregate(aggregate)
        const blogs  = await tbl_blog.aggregatePaginate(aggregation , {limit , page }) 
        return blogs 
    }
    
    public async findOne(_id:string) : Promise<BlogType> {
        const blog = await tbl_blog.findOne({_id } )
        return blog
    }

    public async findWithQuery(query: any ) : Promise<BlogType> {
        const blog = await tbl_blog.findOne(query)
        return blog
    }
    
    public async changeBlogViews(_id:[string] , userId : Types.ObjectId) : Promise<boolean> {
        for(var x = 0 ; x < _id.length ; x++) {
            let blog = await tbl_blog.findOne({_id : _id[x]} , {numViews : 1})
            if(!blog.numViews.includes(userId)) {
                blog = await tbl_blog.findOneAndUpdate({_id : _id[x]} , {$push : {numViews : userId}} , {new : true})
            }
        }
        return true
    }
    
    public async likesAndDislike(_id:string , isLike : boolean , isDisLiked : boolean , userId : string) : Promise<boolean> {
        let bulkWrite : any = []
        if(isLike) {
            bulkWrite = [
                {
                    updateOne : {
                        filter : {_id},
                        update : {$pull : {                    
                            disLikes : userId
                        }}
                    }, 
                },
                {
                    updateOne : {
                        filter : {_id},
                        update : {$pull : {                    
                            likes : userId
                        }}
                    }, 
                },
                {
                    updateOne : {
                        filter : {_id},
                        update : {$push : {                    
                            likes : userId
                        }}
                    }
                }
            ]
        } else {
            bulkWrite = []
            if(!isDisLiked) {
                bulkWrite.push({
                    updateOne : {
                        filter : {_id},
                        update : {$pull : {                    
                            disLikes : userId
                        }}
                    }, 
                })
            } else {
                bulkWrite.push(
                    {
                        updateOne : {
                            filter : {_id},
                            update : {$push : {                    
                                disLikes : userId
                            }}
                        }
                    }
                )
            }
            
            bulkWrite.push({
                updateOne : {
                    filter : {_id},
                    update : {$pull : {                    
                        likes : userId
                    }}
                }, 
            })
        }
        console.log(bulkWrite)
        await tbl_blog.bulkWrite(bulkWrite)
        return true
    }
    
    public async deleteOne(_id:string) {
        const blog = await tbl_blog.deleteOne({_id })
        return blog
    }

    public async activation(_id:string , body : {active : boolean}) : Promise<BlogType> {
        let blog = await this.updateOne(_id , body)
        return blog
    }

    public async uploadImage(files:any , dimension : {width : number , height:number} , id : string) : Promise<BlogType> {
        if(!files || !files.length) throw new Error("chose your blog images")
        let blog : BlogType = await this.findOne(id)
        let imageOperations = new ImageOperations()
        let imagesFormate = await imageOperations.formateImages(files , {width : +dimension.width , height : +dimension.height})
        let imagesCloud = await imageOperations.uploadFilesCloud(imagesFormate , "blog")       
        let publicIds : string[] = [] 
        publicIds = blog.images.map(ele => ele.public_id)
        await imageOperations.deleteFilesCloud(publicIds)
        let images = []
        images = imagesCloud.map(ele => {
        return {url : ele.url , public_id : ele.public_id}
        })
        return await this.updateOne(id , {$set : {images : images}})
    }
    
}
