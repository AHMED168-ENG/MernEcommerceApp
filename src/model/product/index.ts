import mongoose from "mongoose";
import productSchema from "./schemas/productSchema";
import { Pagination } from "mongoose-paginate-ts";
import { ProductPaginateModel, ProductType } from "../../types/product";


const tbl_product = mongoose.model<ProductType, ProductPaginateModel>("tbl_product", productSchema);
 export default tbl_product 
