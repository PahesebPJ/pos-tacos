import { IsInt, IsString } from '@nestjs/class-validator';

export class CreateTableDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  status: number;
}
