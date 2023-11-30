import { NextFunction , Response , Request} from 'express';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';
export default function handel_validation_errors(req: Request , res : Response, next: NextFunction) {
    let newError = {}
    let param = [];
    let errors = [];
    let Errors : any = validationResult(req)

    if (!Errors.isEmpty()) {
      errors = Errors.errors
    } else {
      return next()
    }
    errors?.forEach((element: any) => {
      if (!param.includes(element.param)) {
        param.push(element.param);
        newError[element.param] = [element];
      } else {
        newError[element.param].push(element);
      }
    });
    return res.status(httpStatus.BAD_REQUEST).json({
      errors: newError,
    });
  }