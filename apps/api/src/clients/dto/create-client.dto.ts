import { IsInt, IsString } from '@nestjs/class-validator';

export class CreateClientDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  phone: string;
}
