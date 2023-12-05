import mongoose from "mongoose";
import { EnqPaginateModel, EnqType } from "../../types/enq";
import EnqSchema from "./schemas/enq.schema";

const tbl_enq = mongoose.model<EnqType, EnqPaginateModel>("tbl_enq", EnqSchema);
 export default tbl_enq 
