import mongoose from "mongoose";
import Logging from "./logging.config";
import { Config } from "./config";




class ConnectDb {
    private logging : Logging = new Logging()
    public connect() : void {
        mongoose.connect(Config.MONGOODBURL).then(() => {
            this.logging.loggerOperationInfo().info("connected successful to database")
        }).catch((error) => {
            this.logging.loggerOperationError().error(`connected fail to database ( ${error.message} )`)
        })
    }
}

export default ConnectDb