export default function buildError(statusCode : number, message : string, data : string | {} = null) {
    let err : any = new Error(message);
    err.statusCode = statusCode;
    console.log(err)
    if (data != null) err.data = data;
    return err;
  }