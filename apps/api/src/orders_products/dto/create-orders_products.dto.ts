import { IsInt } from '@nestjs/class-validator';

export class CreateOrdersProductsDto {
  @IsInt()
  id_order: number;

  @IsInt()
  id_product: number;

  @IsInt()
  quantity: number;

  @IsInt()
  discount: number;
}
