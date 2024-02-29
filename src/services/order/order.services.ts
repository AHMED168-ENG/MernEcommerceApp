import tbl_order from '../../model/orders';
import { Others } from '../../helper/helper';
import { PipelineStage } from 'mongoose';




export default class OrderService {

    public async find(query : any , sanitize: string[]) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , sanitize)
        let newSort = await others.sortDocs(sort)
        let aggregateStage : PipelineStage[] = [
            {
                $lookup : {
                    from : "tbl_users",
                    as : "ordered_by",
                    foreignField : "_id",
                    localField : "ordered_by",
                    pipeline : [{
                        $project : {
                            email : 1,
                            firstName : 1,
                            lastName : 1,
                        }
                    }]
                }
            },
            {
                $unwind : {
                    path : "$ordered_by",
                    preserveNullAndEmptyArrays : true
                }
            },
            {$match : newQuery},
            {$sort : newSort}
        ] 
        let aggregate = tbl_order.aggregate(aggregateStage)
        return await tbl_order.aggregatePaginate(aggregate,{limit , page }) 
        
    }

}
