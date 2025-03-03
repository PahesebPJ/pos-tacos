import { IsString } from '@nestjs/class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;
}
