import csurf from 'csurf';
import express , {Request , Response , NextFunction } from "express"
import dotenv from "dotenv"
import path = require("path")
import charMap from "./characterMap"
dotenv.config({
    path: path.join(__dirname, "../env/.env"),
})
import { Config } from "./config/config"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import ConnectDb from "./config/connectDb";
import ApiRoutes from "./routes/index"
import notFoundRoute from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import setCsrfToken from './middleware/setCsrfToken';
import slugify from 'slugify';


class App {
    private app : express.Application = express()
    private PORT : number =  Config.port
    private mongoDb : ConnectDb = new ConnectDb();
    constructor() {
        this.DBAuthorization()
        this.parse()
        this.routes()
        this.listen()
    }

    //************ start this part about authenticate database *********//
    private DBAuthorization() : void {
        this.mongoDb.connect();
    }
    //************ end this part about authenticate database *********//

    //************ start this part parsing data in body and third part package *********//
    private parse(): void {
        this.app.use(express.urlencoded({extended: false})) // parse urlencoded request body الداتا هتجيلك عن طريق json
        this.app.use(cookieParser()) 
        this.app.use(express.json()) 
        slugify.extend(charMap); 
        // this.app.use(this.app.use(csurf()))
        this.app.use(helmet()); // this is third part package about secure app it is used for securety its add some headers to response to mack it secuered its add multable headers used to mack your app more secured
        this.app.use(
            cors()
            // res.setHeader("Access-Control-Allow-Origin" , "*") اسمحلي باي دومين يجيلك
            // res.setHeader("Access-Control-Allow-Methods" , "*") اسمحلي باي request method
            // res.setHeader("Access-Control-Allow-Headers" , "Authorization") اسمجلي باي headers تجيلك
            // ده بالضبط الي بينضاف في middel ware
        );
        this.app.use(morgan("tiny")); // this is third part package logger for node js used to logging the request iformation like request method and url and time state for developing
    }
    //************ end this part parsing data in body and third part package *********//

    //************ start this part about routes *********//
    private routes(): void {
        new ApiRoutes(this.app).routes();
        this.app.use(notFoundRoute);
        this.app.use(errorHandler);
        this.app.use(setCsrfToken)
    }
    //************ end this part about routes *********//

    //************ start this part about listen app *********//
    private listen() : void {
        this.app.listen(this.PORT, () => {
            console.log(`this app work on port ${this.PORT} `)
        })
    }
    //************ end this part about listen app *********//

}


export default App