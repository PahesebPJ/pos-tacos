import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class GetCommandDto {
  @IsOptional()
  @IsInt()
  order_id?: number;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
