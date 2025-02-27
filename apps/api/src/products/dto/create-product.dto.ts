import {
  IsDecimal,
  IsInt,
  IsString,
  MaxLength,
  Min,
} from '@nestjs/class-validator';

export class CreateProductDto {
  @IsInt()
  id: number;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsDecimal()
  @Min(0)
  price: number;

  @IsString()
  description: string;

  @IsString()
  @MaxLength(50)
  type: string;

  @IsString()
  url: string;
}
