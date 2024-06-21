// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import logger from 'winston.config';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(request: Request, response: Response, next: NextFunction): void {
//     const { method, originalUrl, ip } = request;
//     const userAgent = request.get('user-agent') || '';

//     response.on('finish', () => {
//       const { statusCode } = response;
//       const contentLength = response.get('content-length');

//       logger.info({
//         method,
//         originalUrl,
//         statusCode,
//         contentLength,
//         userAgent,
//         ip,
//       });
//     });

//     next();
//   }
// }

// logger.middleware.ts

// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import logger from 'winston.config';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(request: Request, response: Response, next: NextFunction): void {
//     request['logger'] = logger; // Attach logger to request object

//     const { method, originalUrl, ip } = request;
//     const userAgent = request.get('user-agent') || '';

//     response.on('finish', () => {
//       const { statusCode } = response;
//       const contentLength = response.get('content-length');

//       logger.info({
//         method,
//         originalUrl,
//         statusCode,
//         contentLength,
//         userAgent,
//         ip,
//       });
//     });

//     next();
//   }
// }

// logger.middleware.ts

// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import logger from 'winston.config';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(request: Request, response: Response, next: NextFunction): void {
//     const { method, originalUrl, ip } = request;
//     const userAgent = request.get('user-agent') || '';

//     response.on('finish', () => {
//       const { statusCode } = response;
//       const contentLength = response.get('content-length');

//       logger.info({
//         message: 'Request details',
//         timestamp: new Date().toISOString(),
//         level: 'info',
//         method,
//         originalUrl,
//         statusCode,
//         contentLength,
//         userAgent,
//         ip,
//       });
//     });

//     next();
//   }
// }

// logger.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from 'winston.config';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(request: Request, response: Response, next: NextFunction): void {
//     const { method, originalUrl, ip } = request;
//     const userAgent = request.get('user-agent') || '';

//     response.on('finish', () => {
//       // const { statusCode } = response;
//       // const contentLength = response.get('content-length');
//       // logger.info({
//       //   message: 'Request details',
//       //   timestamp: new Date().toISOString(),
//       //   level: 'info',
//       //   request: {
//       //     method,
//       //     originalUrl,
//       //     statusCode,
//       //     contentLength,
//       //     userAgent,
//       //     ip,
//       //   },
//       // });
//     });

//     next();
//   }
// }
// logger.middleware.ts
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(request: Request, response: Response, next: NextFunction): void {
//     const { method, originalUrl, ip } = request;
//     const userAgent = request.get('user-agent') || '';

//     response.on('finish', () => {
//       const { statusCode } = response;
//       const contentLength = response.get('content-length');

//       // logger.info({
//       //   message: 'Request details',
//       //   timestamp: new Date().toISOString(),
//       //   level: 'info',
//       //   request: {
//       //     method,
//       //     originalUrl,
//       //     statusCode,
//       //     contentLength,
//       //     userAgent,
//       //     ip,
//       //   },
//       // });
//     });

//     next();
//   }
// }
