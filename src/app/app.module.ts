import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurations from 'src/core/config/configurations';
import { AppController } from './app.controller';
import { Modules } from './modules/module';
// import { ImageController } from 'src/uploads/image.controller';
// import { CloudinaryService } from 'src/uploads/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from 'src/shared/cloudinary/image.controller';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { VercelController } from 'src/shared/vercel/vercel.controller';
import { VercelService } from 'src/shared/vercel/vercel.service';
import { BackblazeController } from 'src/shared/backblaze/backblaze.controller';
import { BackblazeService } from 'src/shared/backblaze/backblaze.service';
import { MyConfigService } from 'src/core/config/config.service';
// import { LoggerMiddleware } from 'src/core/middleware/logger.middleware';

const envFilePath = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

console.log('Using env file path:', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],

      // envFilePath: `.env.${process.env.NODE_ENV || 'development'}.env`,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : process.env.NODE_ENV === 'testing'
            ? '.env.testing'
            : '.env.development',
    }),
    MulterModule.register({ dest: './src/uploads' }),
    ...Modules,
  ],
  controllers: [
    AppController,
    ImageController,
    VercelController,
    BackblazeController,
  ],
  providers: [
    AppService,
    CloudinaryService,
    VercelService,
    BackblazeService,
    MyConfigService,
  ],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply middleware to all routes
//   }
// }
export class AppModule {}
