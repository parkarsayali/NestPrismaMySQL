// create-state.dto.ts
import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateStateDto {
  @IsInt()
  @IsOptional()
  state_id?: number;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(10)
  alpha_code: string;

  @IsInt()
  country_id: number;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  countries: object;
}

export class UpdateStateDto {
  @IsInt()
  @IsOptional()
  state_id?: number;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  alpha_code?: string;

  @IsInt()
  @IsOptional()
  country_id?: number;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @IsOptional()
  countries?: object;
}
