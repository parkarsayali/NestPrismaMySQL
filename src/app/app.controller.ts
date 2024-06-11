import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('app')
export class AppController {
  @Get('protected')
  // @UseGuards(JwtAuthGuard)
  getProtected() {
    return 'This is a protected route';
  }
}
