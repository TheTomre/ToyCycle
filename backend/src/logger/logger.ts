import winston from "winston";

// Create a logger instance with enhanced error logging
const logger = winston.createLogger({
  format: winston.format.combine(
    // Include error stack traces
    winston.format.errors({ stack: true }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
      info => {
        const data = info["stack"] ? `\n${info["stack"]}` : "";
        return `${info["timestamp"]} ${info.level}: ${info.message}${data}`;
      }
      // Check if there is a stack available (it's an error) and format accordingly
    )
  ),
  transports: [
    // Transport for error logs
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),
    // Transport for warning logs
    new winston.transports.File({
      filename: "logs/warning.log",
      level: "warn"
    }),
    // Transport for info logs
    new winston.transports.File({
      filename: "logs/info.log",
      level: "info"
    }),
    // Console transport for output on the terminal
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.printf(info => {
          const data = info["stack"] ? `\n${info["stack"]}` : "";
          // Check if there is a stack available (it's an error) and format accordingly
          return `${info["timestamp"]} ${info.level}: ${info.message}${data}`;
        })
      ),
      level: "info"
    })
  ]
});

export default logger;
