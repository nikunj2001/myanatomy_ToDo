const { createLogger, format, transports } = require("winston");

module.exports = createLogger(
    {
        transports: [
            new transports.File({
                filename: "logs/server.log",
                level: "info",
                format: format.combine(
                    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                    format.printf(
                        (info) => {
                            return info.level === "info" ? `${info.level}: ${[info.timestamp]} : ${info.message}` : ""
                        }
                    )
                )
            }),
            new transports.File({
                filename: "logs/error.log",
                level: "error",
                format: format.combine(
                    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                    format.printf(
                        (info) => {
                            return info.level === "error" ? `${info.level}: ${[info.timestamp]} : ${info.message}` : ""
                        }
                    )
                )
            })
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'logs/exceptions.log' })
        ]
    }
)