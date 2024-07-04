import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyConfigService {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    console.log('DATABASE', this.configService.get<string>('DATABASE_URL'));
    return this.configService.get<string>('DATABASE_URL');
  }
}
