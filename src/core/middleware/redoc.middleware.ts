import { INestApplication } from '@nestjs/common';
import redoc from 'redoc-express';

export function setupRedoc(app: INestApplication) {
  const redocOptions = {
    title: 'Your API Title',
    version: '1.0',
    specUrl: '/api-json',
  };

  app.use('/docs', redoc(redocOptions));
}

// redoc.middleware.ts

// import { ExpressAdapter } from '@nestjs/platform-express';
// import { RedocModule, RedocOptions } from 'nestjs-redoc';
// import { INestApplication } from '@nestjs/common';
// import * as express from 'express';

// export function setupRedoc(app: any) {
//   const options: any = {
//     title: 'RD Brothers API Documentation',
//     logo: {
//       url: 'https://example.com/logo.png',
//       altText: 'Logo Alt Text',
//     },
//     theme: {
//       openapi: {
//         schemaDefinitionsTagName: 'Schemas',
//       },
//     },
//   };

//   const redocModule = RedocModule.setup('/docs', app, options, {
//     disableSearch: false,
//   });

//   app.use('/docs', (req, res, next) => {
//     if (req.url === '/docs' && req.accepts('html')) {
//       res.statusCode = 302;
//       res.setHeader('Location', '/docs/');
//       res.end();
//       return;
//     }
//     next();
//   });

//   app.use('/docs', new ExpressAdapter(redocModule));
// }
