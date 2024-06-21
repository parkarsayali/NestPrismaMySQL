// import * as winston from 'winston';
// import 'winston-daily-rotate-file';

// const logFormat = winston.format.printf(({ timestamp, level, message }) => {
//   return `${timestamp} ${level}: ${message}`;
// });

// const logger = winston.createLogger({
//   format: winston.format.combine(
//     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     logFormat,
//   ),
//   transports: [
//     new winston.transports.Console({
//       level: 'info',
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple(),
//       ),
//     }),
//     new winston.transports.DailyRotateFile({
//       level: 'info',
//       filename: 'logs/application-%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       zippedArchive: true,
//       // No maxSize and maxFiles
//     }),
//     new winston.transports.DailyRotateFile({
//       level: 'error',
//       filename: 'logs/error-%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       zippedArchive: true,
//       // No maxSize and maxFiles
//     }),
//   ],
// });

// export default logger;

// import * as winston from 'winston';
// import 'winston-daily-rotate-file';

// const infoLogFormat = winston.format.combine(
//   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   winston.format.printf(
//     ({ timestamp, level, methodName, message, request, response }) => {
//       return JSON.stringify({
//         timestamp,
//         level,
//         methodName,
//         message,
//         request,
//         response,
//       });
//     },
//   ),
// );

// const errorLogFormat = winston.format.combine(
//   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   winston.format.printf(
//     ({ timestamp, level, methodName, message, request, response }) => {
//       return JSON.stringify({
//         timestamp,
//         level,
//         methodName,
//         message,
//         request,
//         response,
//       });
//     },
//   ),
// );

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({
//       level: 'info',
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple(),
//       ),
//     }),
//     new winston.transports.DailyRotateFile({
//       level: 'info',
//       filename: 'logs/info-%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       zippedArchive: true,
//       format: infoLogFormat,
//     }),
//     new winston.transports.DailyRotateFile({
//       level: 'error',
//       filename: 'logs/error-%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       zippedArchive: true,
//       format: errorLogFormat,
//     }),
//   ],
// });

// export default logger;

import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.printf(
  ({ timestamp, level, message, ...metadata }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...metadata,
    });
  },
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
    }),
  ],
});

export default logger; // Export logger instance
