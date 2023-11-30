import mongoose from "mongoose";
import CartSchema from "./schemas/cart.schema";
import { CartPaginateModel, CartType } from "../../types/cart";

const tbl_cart = mongoose.model<CartType, CartPaginateModel>("tbl_cart", CartSchema);
 export default tbl_cart 
