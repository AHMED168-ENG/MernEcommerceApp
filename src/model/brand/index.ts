import mongoose from "mongoose";
import { BlogCategoryPaginateModel, BlogCategoryType } from "../../types/blog_category";
import BrandSchema from "./schemas/brand_schema";

const tbl_brand = mongoose.model<BlogCategoryType, BlogCategoryPaginateModel>("tbl_brand", BrandSchema);
 export default tbl_brand 
