import { check , query } from "express-validator";



export default class ColorValidation {
    public name() {
        return check("name").notEmpty().withMessage("enter color name please")
    }

    private page() {
        return query("page").isInt({ gt: 0 });
    }
    
    private limit() {
        return query("limit").isInt({ gt: 0 });
    }

    public checkPaginationParams() {
        return [
           this.page(),
           this.limit()
        ]
    }
}