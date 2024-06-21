// src/config/env.config.ts
import {
  IsInt,
  IsString,
  IsUrl,
  IsIn,
  validateSync,
  IsPositive,
} from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';

export class EnvConfig {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_DATABASE: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  NEST_DEBUG: number;

  @IsString()
  RUST_BACKTRACE: string;

  @IsString()
  DEVELOPMENT_API_URL: string;

  @IsUrl()
  PRODUCTION_API_URL: string;

  @IsUrl()
  STAGING_API_URL: string;

  @IsString()
  @IsIn(['development', 'production', 'staging'])
  NODE_ENV: string;

  @IsString()
  DATABASE_URL: string;
}

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvConfig, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
