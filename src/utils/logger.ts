import { createLogger, format, transports } from "winston";

import DailyRotateFile from "winston-daily-rotate-file";

const logFormat = format.combine(
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

// Create rotating transport
const transportRotate = new DailyRotateFile({
  filename: "logs/app-%DATE%.log", // Log file name pattern
  datePattern: "YYYY-MM-DD", // Rotate daily with this format
  zippedArchive: true, // Optional: compress rotated logs
  maxSize: "20m", // Max size per log file (e.g., 20 MB)
  maxFiles: "14d", // Retain logs for 14 days, delete older ones
});

const errorRotate = new DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxFiles: "14d",
});

const combinedRotate = new DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "info",
  maxFiles: "14d",
});

// Create logger with rotating transport
const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    transportRotate,
    combinedRotate,
    errorRotate,
    new transports.Console(), // Optional: log to console
  ],
});

export default logger;
