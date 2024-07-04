import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CountryController } from './country.controller';
import { CountryService } from './country.services';
import { PrismaModule } from 'src/database/prisma.module';
import CountryRepository from './country.repository';
// import { CountryRepository } from './country.repository';

@Module({
  imports: [PrismaModule],
  providers: [PrismaClient, CountryRepository, CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
