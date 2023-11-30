import mongoose from "mongoose";
import productCategorySchema from "./schemas/product_categorySchema";
import { ProductCategoryPaginateModel, ProductCategoryType } from "../../types/product_category";

const tbl_product_category = mongoose.model<ProductCategoryType, ProductCategoryPaginateModel>("tbl_product_category", productCategorySchema);
 export default tbl_product_category 
