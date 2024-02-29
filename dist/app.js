"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require("path");
const characterMap_1 = __importDefault(require("./characterMap"));
dotenv_1.default.config({
    path: path.join(__dirname, "../env/.env"),
});
const config_1 = require("./config/config");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const index_1 = __importDefault(require("./routes/index"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const setCsrfToken_1 = __importDefault(require("./middleware/setCsrfToken"));
const slugify_1 = __importDefault(require("slugify"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = config_1.Config.port;
        this.mongoDb = new connectDb_1.default();
        this.DBAuthorization();
        this.parse();
        this.routes();
        this.listen();
    }
    DBAuthorization() {
        this.mongoDb.connect();
    }
    parse() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
        slugify_1.default.extend(characterMap_1.default);
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("tiny"));
    }
    routes() {
        new index_1.default(this.app).routes();
        this.app.use(notFound_1.default);
        this.app.use(errorHandler_1.default);
        this.app.use(setCsrfToken_1.default);
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`this app work on port ${this.PORT} `);
        });
    }
}
exports.default = App;
