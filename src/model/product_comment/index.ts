import mongoose from "mongoose";
import ProductCommentSchema from "./schemas/product_comment_schema";
import { ProductCommentPaginateModel, ProductCommentType } from "../../types/product_comment";

const  tbl_product_comment = mongoose.model<ProductCommentType, ProductCommentPaginateModel>("tbl_product_comment", ProductCommentSchema);
 export default tbl_product_comment 
