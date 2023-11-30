import { ProductCommentType } from '../../types/product_comment';
import tbl_product_comment from '../../model/product_comment';
import { Types } from 'mongoose';





export default class ProductCommentService {

    public async create(body : any) : Promise<ProductCommentType> {
        const productComment = await tbl_product_comment.create(body)
        return productComment
    }
    
    public async updateOne(_id:string, userId : string , body:any) : Promise<ProductCommentType> {
        const comment = await tbl_product_comment.findOne({_id});
        if(comment.user_id.toString() != userId) throw new Error("this comment not belong to you")
        const productComment = await tbl_product_comment.findByIdAndUpdate(_id  , body , {new : true})
        return productComment
    }
    
    public async find(product_id : string , query : {limit : string , page:string}) : Promise<any> { 
        let {limit , page} = query
        const productComment = await tbl_product_comment.paginate({limit , page , query : {product_id} }) 
        return productComment 
    }
    
    public async deleteOne(_id:string, userId : string) {
        const comment = await tbl_product_comment.findOne({_id});
        if(comment.user_id.toString() != userId) throw new Error("this comment not belong to you")
        const productComment = await tbl_product_comment.deleteOne({_id })
        return productComment
    }

    public async commentLike(_id:string, isLike : boolean , isDisLiked : boolean , userId : string) {
        let bulkWrite : any = []
        if(isLike) {
            bulkWrite = [
                {
                    updateOne : {
                        filter : {_id},
                        update : {$pull : {                    
                            dis_likes : userId
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
            if(!isDisLiked) {
                bulkWrite.push({
                    updateOne : {
                        filter : {_id},
                        update : {$pull : {                    
                            dis_likes : userId
                        }}
                    }, 
                })
            } else {
                bulkWrite.push(
                    {
                        updateOne : {
                            filter : {_id},
                            update : {$push : {                    
                                dis_likes : userId
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
        return await tbl_product_comment.bulkWrite(bulkWrite)
        
    }

}
