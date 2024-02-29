"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageExtention = exports.Config = void 0;
exports.Config = {
    port: +process.env.NODE_SERVER_PORT,
    mongoDbUrl: process.env.MONGOODBURL,
    mail: {
        service: process.env.NODEMAILER_SERVICE,
        host: process.env.NODEMAILER_HOST,
        port: +process.env.NODEMAILER_PORT,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    },
    NODE_SERVER_ENV: process.env.NODE_SERVER_ENV,
    MONGOODBURL: process.env.MONGOODBURL,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    SECRET_KEY: process.env.SECRET_KEY,
};
exports.imageExtention = ["jpg", "png", "jpeg", "gif", "svg"];
