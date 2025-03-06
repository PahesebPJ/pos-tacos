// create-product-request.dto.ts
import {
  IsDecimal,
  IsOptional,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';

export class CreateProductRequestDto {
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

  @IsOptional()
  @IsString()
  url?: string;
}
