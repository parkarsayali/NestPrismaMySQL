import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurations from 'src/core/config/configurations';
import { StatesModule } from 'src/modules/states/states.module';
import { CountryModule } from 'src/modules/country/country.module';
import { CityModule } from 'src/modules/city/city.module';
import { Modules } from 'src/modules/module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    // combinedModules
    ...Modules,
    // StatesModule,
    // CountryModule,
    // CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
