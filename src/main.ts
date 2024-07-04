// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app/app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupRedoc } from './core/middleware/redoc.middleware';
import * as dotenv from 'dotenv';
// import * as dotenv from 'dotenv-defaults';
// import * as dotenvDefaults from 'dotenv-defaults';
import { ConfigService } from '@nestjs/config';
import { RedocModule } from 'nestjs-redoc';

async function bootstrap() {
  dotenv.config();
  // dotenv.config({
  //   path: process.env.dotenv_config_path, // Load the .env file for the specific environment
  //   defaults: '.env.defaults', // Load the .env.defaults file
  // });
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const options = new DocumentBuilder()
    .setTitle('RD Brothers Api')
    .setDescription('Api documentation')
    .setVersion('1.0')
    .addServer(process.env.DEVELOPMENT_API_URL, 'Development server')
    .addServer(process.env.PRODUCTION_API_URL, 'Production server')
    .addServer(process.env.STAGING_API_URL, 'Staging server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // This name should match the one used in the security decorator
    )
    .build();

  options.components = {
    ...options.components,
    schemas: {
      State: {
        // @ts-ignore
        'x-tags': ['State', 'Country'],
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
      },
      User: {
        // @ts-ignore
        'x-tags': ['State', 'Country'],
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
      },
      404: {
        // @ts-ignore
        'x-tags': ['State'],
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: '404',
          },
          message: {
            type: 'string',
            example: 'Not Found',
          },
        },
      },
      500: {
        // @ts-ignore
        'x-tags': ['State'],
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: '500',
          },
          message: {
            type: 'string',
            example: 'Internal server error',
          },
        },
      },
    },
  };

  options.tags = [
    ...options.tags,
    {
      name: 'State',
      description:
        '<SchemaDefinition schemaRef="#/components/schemas/State" />',
    },
    {
      name: '404',
      description: '<SchemaDefinition schemaRef="#/components/schemas/404" />',
    },
    {
      name: '500',
      description: '<SchemaDefinition schemaRef="#/components/schemas/500" />',
    },
  ];

  console.log('options', options);

  const document = SwaggerModule.createDocument(app, options);

  const redocOptions: any = {
    title: `My title`,
    // logo: {
    //   url: `${process.env.DOCS_LOGO}`,
    //   backgroundColor: '#d0e8c5',
    //   altText: 'LOGO',
    // },
    theme: {
      typography: {
        fontSize: '16px',
        fontWeightBold: '900',
      },
      sidebar: {
        backgroundColor: '#d0e8c5',
      },
      rightPanel: {
        backgroundColor: '#01312b',
      },
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    noAutoAuth: true,
    pathInMiddlePanel: true,
    tagGroups: [
      {
        name: 'Group 1',
        tags: ['State', 'Country'],
      },
      {
        name: 'Schemas',
        tags: ['404', '500'],
      },
    ],
  };
  await RedocModule.setup('docs', app as any, document, redocOptions);

  SwaggerModule.setup('api', app, document);

  setupRedoc(app);

  const configService = app.get(ConfigService);
  // console.log(`Database URL: ${configService.get<string>('NODE_ENV')}`);
  await app.listen(3000);
}
bootstrap();
