import { Others } from '../../helper/helper';
import tbl_brand from '../../model/brand';
import { BrandType } from '../../types/brand';




export default class BrandService {

    public async create(body : any) : Promise<BrandType> {
        const brand = await tbl_brand.create(body)
        return brand
    }
    
    public async updateOne(_id:string , body:any) : Promise<BrandType> {
        const brand = await tbl_brand.findByIdAndUpdate(_id  , {$set : body} , {new : true})
        return brand
    }
    
    public async find(query : any , sanitize: string[]) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , sanitize)
        let newSort = await others.sortDocs(sort)
        const brand = await tbl_brand.paginate({limit , page , sort : newSort , query : newQuery}) 
        return brand 
    }
    
    public async findOne(_id:string) : Promise<BrandType> {
        const brand = await tbl_brand.findOne({_id})
        return brand
    }

    public async findWithQuery(query: any ) : Promise<BrandType> {
        const brand = await tbl_brand.findOne(query)
        return brand
    }
    
    public async activation(_id:string , body : {active : boolean}) : Promise<BrandType> {
        let brand = await this.updateOne(_id , body)
        return brand
    }
    
    public async deleteOne(_id:string) {
        const brand = await tbl_brand.deleteOne({_id })
        return brand
    }

}
