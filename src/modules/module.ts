// import { AuthModule } from '../auth/auth.module';

import { StatesModule } from './states/states.module';

import { CityModule } from './city/city.module';

import { CountryModule } from './country/country.module';

import { UserModule } from './users/user.module';

export const Modules = [StatesModule, CityModule, CountryModule, UserModule];
