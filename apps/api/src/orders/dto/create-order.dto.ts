import { IsInt } from '@nestjs/class-validator';

export class CreateOrderDto {
  @IsInt()
  status: number;

  @IsInt()
  total: number;

  @IsInt()
  tablesId: number;

  @IsInt()
  clientsId: number;
}
