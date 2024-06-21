import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurations from 'src/core/config/configurations';
import { Modules } from 'src/modules/module';
// import { ImageController } from 'src/uploads/image.controller';
// import { CloudinaryService } from 'src/uploads/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from 'src/shared/cloudinary/image.controller';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { VercelController } from 'src/shared/vercel/vercel.controller';
import { VercelService } from 'src/shared/vercel/vercel.service';
import { BackblazeController } from 'src/shared/backblaze/backblaze.controller';
import { BackblazeService } from 'src/shared/backblaze/backblaze.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.env`,
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
  providers: [AppService, CloudinaryService, VercelService, BackblazeService],
})
export class AppModule {}
