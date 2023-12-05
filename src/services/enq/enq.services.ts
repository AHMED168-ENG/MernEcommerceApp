import tbl_enq from '../../model/enq';
import { Others } from '../../helper/helper';
import { EnqType } from '../../types/enq';




export default class EnqService {

    public async create(body : any) : Promise<EnqType> {
        const enq = await tbl_enq.create(body)
        return enq
    }
    
    public async updateOne(_id:string , body:any) : Promise<EnqType> {
        const enq = await tbl_enq.findByIdAndUpdate(_id  , body , {new : true})
        return enq
    }
    
    public async find(query : any , sanitize: string[] ) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , sanitize)
        let newSort = await others.sortDocs(sort)
        const enqs  = await tbl_enq.paginate({limit , page , query : newQuery , sort : newSort }) 
        return enqs 
    }
    
    public async findOne(_id:string) : Promise<EnqType> {
        const enq = await tbl_enq.findOne({_id } )
        return enq
    }

    public async findWithQuery(query: any ) : Promise<EnqType> {
        const enq = await tbl_enq.findOne(query)
        return enq
    }
    
    public async deleteOne(_id:string) {
        const enq = await tbl_enq.deleteOne({_id })
        return enq
    }

}
