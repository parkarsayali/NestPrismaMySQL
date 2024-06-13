import { AuthModule } from '../core/auth/auth.module';

import { StatesModule } from './states/states.module';

import { CityModule } from './city/city.module';

import { CountryModule } from './country/country.module';

import { UsersModule } from './user/user.module';

export const Modules = [
  AuthModule,
  UsersModule,
  StatesModule,
  CityModule,
  CountryModule,
];
