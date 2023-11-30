import mongoose from "mongoose";
import { BlogPaginateModel, BlogType } from "../../types/blog";
import BlogSchema from "./schemas/blogSchema";


// const tbl_blog: Model<BlogType> & AggregatePaginateModel<BlogType> = mongoose.model<BlogType>('tbl_blog', BlogSchema);
const tbl_blog = mongoose.model<BlogType, BlogPaginateModel>("tbl_blog", BlogSchema);
 export default tbl_blog 
