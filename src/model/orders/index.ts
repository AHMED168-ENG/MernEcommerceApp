import mongoose from "mongoose";
import OrderSchema from "./schemas/order.schema";
import { OrderPaginateModel, OrderType } from "../../types/order";

const tbl_order = mongoose.model<OrderType, OrderPaginateModel>("tbl_order", OrderSchema);
 export default tbl_order 
