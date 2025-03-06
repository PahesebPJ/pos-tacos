import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersProductsDto } from './create-orders_products.dto';

export class UpdateOrderProductDto extends PartialType(
  CreateOrdersProductsDto,
) {}
