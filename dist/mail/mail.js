"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMails = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config/config");
class SendMails {
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let transporter = nodemailer_1.default.createTransport(config_1.Config.mail);
            let mailOptions = {
                from: "zaza090977777@gmail.com",
                to: "zaza090977777@gmail.com",
                subject: data.subject,
                html: `<!DOCTYPE html>
    <html lang="en">
        <head>
            <title></title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="css/style.css" rel="stylesheet">
        </head>
        <body>
            <h3>welcome mr  ${data.fName} ${data.lName} in my application </h3>
            <p>We care about your safety</p>
            <p>${data.subject}</p>
            ${data.url ? `<a href='${data.url}'>click hir</a>` : ""}
            
            
        </body>
    </html>`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
        });
    }
}
exports.SendMails = SendMails;
