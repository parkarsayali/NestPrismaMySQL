import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurations from 'src/core/config/configurations';
import { AppController } from './app.controller';
import { Modules } from './modules/module';
// import { LoggerMiddleware } from 'src/core/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],

      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.env`,
    }),
    ...Modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply middleware to all routes
//   }
// }
export class AppModule {}
