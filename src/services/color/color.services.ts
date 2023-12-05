import tbl_color from '../../model/colors';
import { Others } from '../../helper/helper';
import { ColorType } from '../../types/color';




export default class ColorService {

    public async create(body : any) : Promise<ColorType> {
        const color = await tbl_color.create(body)
        return color
    }
    
    public async updateOne(_id:string , body:any) : Promise<ColorType> {
        const color = await tbl_color.findByIdAndUpdate(_id  , body , {new : true})
        return color
    }
    
    public async find(query : any , sanitize: string[] ) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , ["name"])
        let newSort = await others.sortDocs(sort)
        const colors  = await tbl_color.paginate({limit , page , query : newQuery , sort : newSort }) 
        return colors 
    }
    
    public async findOne(_id:string) : Promise<ColorType> {
        const color = await tbl_color.findOne({_id } )
        return color
    }

    public async findWithQuery(query: any ) : Promise<ColorType> {
        const color = await tbl_color.findOne(query)
        return color
    }
    
    public async deleteOne(_id:string) {
        const color = await tbl_color.deleteOne({_id })
        return color
    }

}
