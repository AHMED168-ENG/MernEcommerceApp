import mongoose from "mongoose";
import CouponSchema from "./schemas/coupon.schema";
import { CouponPaginateModel, couponType } from "../../types/coupon";

const tbl_coupon = mongoose.model<couponType, CouponPaginateModel>("tbl_coupon", CouponSchema);
 export default tbl_coupon 
