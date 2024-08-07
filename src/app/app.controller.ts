import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth-guard';
import { ConfigService } from '@nestjs/config';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  getProtected() {
    return 'This is a protected route';
  }

  @Get()
  getDatabaseConfig() {
    return this.appService.getDatabaseConfig();
  }

  @Get('env')
  getEnvironment() {
    return this.appService.getEnvironment();
  }
}
