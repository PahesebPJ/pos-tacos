import { IsInt, IsString } from '@nestjs/class-validator';

export class CreateTableDto {
  @IsString()
  name: string;

  @IsInt()
  status: number;
}
