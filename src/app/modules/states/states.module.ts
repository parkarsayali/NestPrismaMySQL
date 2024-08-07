// import { Module } from '@nestjs/common';
// import { PrismaModule } from 'src/database/prisma.module';
// import stateRepository from 'src/repository/state';
// import { StatesController } from './states.controller';

// @Module({
//   imports: [PrismaModule],
//   providers: [stateRepository, StateService],
//   controllers: [StatesController],
// })
// export class StatesModule {}

import { Module } from '@nestjs/common';
import { StateService } from './states.services';
import { StatesController } from './states.controller';
import { PrismaClient } from '@prisma/client';
import StoredProcedureRepository from 'src/core/repository/stored-procedure-repository';
import { PrismaModule } from 'src/database/prisma.module';
import StateRepository from './state.repository';
import { ConfigModule } from '@nestjs/config';
// import { StateRepository } from './state.repository';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [
    PrismaClient,
    StoredProcedureRepository,
    StateRepository,
    StateService,
  ],
  controllers: [StatesController],
})
export class StatesModule {}
