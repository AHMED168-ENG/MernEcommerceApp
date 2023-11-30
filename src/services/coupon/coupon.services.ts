import tbl_coupon from '../../model/coupon';
import { Others } from '../../helper/helper';
import { couponType } from '../../types/coupon';




export default class CouponService {

    public async create(body : any) : Promise<couponType> {
        const coupon = await tbl_coupon.create(body)
        return coupon
    }
    
    public async updateOne(_id:string , body:any) : Promise<couponType> {
        const coupon = await tbl_coupon.findByIdAndUpdate(_id  , body , {new : true})
        return coupon
    }
    
    public async find(query : any , sanitize: string[] ) : Promise<any> { 
        let {limit , page , sort} = query
        let others : Others = new Others()
        let newQuery = await others.sanitizeQuery(query , ["name"])
        let newSort = await others.sortDocs(sort)
        const coupons  = await tbl_coupon.paginate({limit , page , query : newQuery , sort : newSort }) 
        return coupons 
    }
    
    public async findOne(_id:string) : Promise<couponType> {
        const coupon = await tbl_coupon.findOne({_id } )
        return coupon
    }

    public async findWithQuery(query: any ) : Promise<couponType> {
        const coupon = await tbl_coupon.findOne(query)
        return coupon
    }
    
    public async deleteOne(_id:string) {
        const coupon = await tbl_coupon.deleteOne({_id })
        return coupon
    }

}
