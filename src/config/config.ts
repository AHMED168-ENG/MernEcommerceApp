interface IEnv  {
    port : number
    mongoDbUrl : string 
    mail : object
    NODE_SERVER_ENV : string
    MONGOODBURL : string
    SALT_ROUNDS : string 
    SECRET_KEY : string 
}


export const Config : IEnv = {
    port : +process.env.NODE_SERVER_PORT,
    mongoDbUrl : process.env.MONGOODBURL,
    mail : {
        service:process.env.NODEMAILER_SERVICE,
        host: process.env.NODEMAILER_HOST,
        port: +process.env.NODEMAILER_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.NODEMAILER_USERNAME,
          pass: process.env.NODEMAILER_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    },
    NODE_SERVER_ENV : process.env.NODE_SERVER_ENV,
    MONGOODBURL : process.env.MONGOODBURL,
    SALT_ROUNDS : process.env.SALT_ROUNDS,
    SECRET_KEY : process.env.SECRET_KEY,
}

export const imageExtention: string[] = ["jpg", "png", "jpeg", "gif", "svg"];
