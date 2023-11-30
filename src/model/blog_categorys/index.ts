import mongoose from "mongoose";
import blogCategorySchema from "./schemas/blog_categorySchema";
import { BlogCategoryPaginateModel, BlogCategoryType } from "../../types/blog_category";

const tbl_blog_category = mongoose.model<BlogCategoryType, BlogCategoryPaginateModel>("tbl_blog_category", blogCategorySchema);
 export default tbl_blog_category 
