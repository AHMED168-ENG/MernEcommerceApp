import nodemailer from "nodemailer";
import { Config } from "../config/config";

export class SendMails {
  public async send(data : {
    email: string,
    fName: string,
    lName: string,
    subject: string,
    url?: string}
  ) {
    let transporter = nodemailer.createTransport(Config.mail);
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
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
 