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

async function bootstrap() {
  dotenv.config();
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
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  setupRedoc(app);
  await app.listen(3000);
}
bootstrap();
