import { NextFunction, Request, Response } from "express";




export default class FilterBody {
    public filter(selectors : string[]) {
        return (req : Request , res : Response , next : NextFunction) => {
            let newBody = {}
            let {body} = req
            selectors.forEach(ele => {
                newBody[ele] = body[ele]
            })
            req.body = newBody
            next()
        }
    }
}