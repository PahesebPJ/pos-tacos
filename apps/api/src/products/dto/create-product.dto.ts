import { IsDecimal, IsString, MaxLength } from '@nestjs/class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsDecimal()
  price: number;

  @IsString()
  description: string;

  @IsString()
  @MaxLength(50)
  type: string;

  @IsString()
  url: string;
}
