import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    return {
      dbPort: this.configService.get<number>('DB_PORT'),
      dbUsername: this.configService.get<string>('DB_USERNAME'),
      dbPassword: this.configService.get<string>('DB_PASSWORD'),
      dbHost: this.configService.get<string>('DB_HOST'),
      dbName: this.configService.get<string>('DB_DATABASE'),
      databaseUrl: this.configService.get<string>('DATABASE_URL'),
    };
  }

  getEnvironment() {
    return {
      dbEnv: this.configService.get<string>('DEMO'),
    };
  }

  getHello(): string {
    return 'Hello 12-06-2024';
  }
}
