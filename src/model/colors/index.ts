import mongoose from "mongoose";
import { colorPaginateModel, ColorType } from "../../types/color";
import ColorSchema from "./schemas/color.schema";

const tbl_color = mongoose.model<ColorType, colorPaginateModel>("tbl_color", ColorSchema);
 export default tbl_color 
