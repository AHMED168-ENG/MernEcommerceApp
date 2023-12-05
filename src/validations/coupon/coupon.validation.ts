import { check , query } from "express-validator";
import CouponService from "../../services/coupon/coupon.services";



export default class couponValidation {
    private name(id?:boolean) {
        return check("name").notEmpty().withMessage("enter coupon name please").custom(async(val , {req}) => {
            const couponService = new CouponService()
            let query : {name : string , _id? : {}} = {name : val}
            if(id) query._id = {$ne : req.params.id}
            const coupon = await couponService.findWithQuery(query)
            if(coupon) return Promise.reject("")
            return true
        }).withMessage("this coupon already exist").trim()
    }

    private discount() {
        return check("discount").notEmpty().withMessage("enter coupon discount ").isNumeric().withMessage("this field accept number")
    }

    private discount_type() {
        return check("discount_type").notEmpty().withMessage("enter coupon discount type ").custom((val , {req}) => {
            let types = ['percentage', 'fixed']
            if(!types.includes(val)) throw new Error(`discount type should be in ${types.join(" , ")} `);
            return true
        })
    }

    private count() {
        return check("count").notEmpty().withMessage("enter coupon count available").isNumeric().withMessage("coupon count accept number")
    }

    private expiration() {
        return check("expiration").notEmpty().withMessage("enter coupon expiration ").isISO8601().toDate().withMessage("this field accept date")
    }

    private page() {
        return query("page").isInt({ gt: 0 });
    }
    
    private limit() {
        return query("limit").isInt({ gt: 0 });
    }

    public checkPaginationParams() {
        return [
           this.page(),
           this.limit()
        ]
    }

    public createCoupon() {
        return [
            this.name(),
            this.discount_type(),
            this.discount(),
            this.expiration(),
            this.count()
        ]
    }
    
    public updateCoupon() {
        return [
            this.name(true),
            this.discount_type(),
            this.discount(),
            this.expiration(),
            this.count()
        ]
    }

    

}