import { check , query } from "express-validator";
import { ENQ_STATUS } from "../../constant/enq";



export default class EnqValidation {
    private email() {
        return check("email").notEmpty().withMessage("enter enq email please")
    }

    private name() {
        return check("name").notEmpty().withMessage("enter enq name please")
    }

    private mobile() {
        return check("mobile").notEmpty().withMessage("enter enq mobile please")
    }

    private comment() {
        return check("comment").notEmpty().withMessage("enter enq comment please")
    }

    public status() {
        return check("status").optional().custom((val , {req}) => {
            if(!ENQ_STATUS.includes(val)) return Promise.reject("status accept value as one from " + ENQ_STATUS.join(" , ")) 
            return true
        })
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

    public create() {
        return [
            this.name(),
           this.email(),
           this.mobile(),
           this.comment(),
        ]
    }

    public update() {
        return [
            this.name(),
            this.email(),
            this.mobile(),
            this.comment(),
            this.status(),
        ]
    }
}