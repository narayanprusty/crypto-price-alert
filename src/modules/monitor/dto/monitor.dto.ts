import {
  IsString,
  IsNumber,
  IsInt,
  Min
} from 'class-validator';

export class MonitorDto {
  @IsString()
  purchase: string;

  @IsString()
  sell: string;

  @IsInt()
  @Min(5)
  interval: number;

  @IsNumber()
  @Min(0.01)
  change: number;
}