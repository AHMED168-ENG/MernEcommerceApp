import * as path from "path";
import { format, transports } from "winston";
import winston from "winston";
// const { printf, combine, label, timestamp } = format;

class Logging {
  public loggerOperationError(): winston.Logger {
    return winston
      .createLogger({
        transports: [
          new transports.File({
            format: format.combine(format.timestamp(), format.json()),
            filename: path.join(__dirname, "../logging/error.log"),
            level: "error",
          }),
        ],
      })
      .add(
        new transports.Console({
          level: "error",
          format: format.json(),
        })
      );
  }

  public loggerOperationInfo(): winston.Logger {
    return winston
      .createLogger({
        transports: new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: path.join(__dirname, "../logging/combined.log"),
          level: "info",
        }),
      })
      .add(
        new transports.Console({
          level: "info",
          format: format.combine(format.json()),
        })
      );
  }
}
export default Logging;
