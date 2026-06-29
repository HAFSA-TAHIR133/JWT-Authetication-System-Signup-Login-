import winston from "winston";
import fs from "fs";

//  Ensure logs folder exists
if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

export const logger = winston.createLogger({
    level: "info",

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),

    transports: [
        // console
        new winston.transports.Console(),

        // error file
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),

        // combined file
        new winston.transports.File({
            filename: "logs/combined.log"
        })
    ]
});

export default logger;