import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('order') order: 'ASC' | 'DESC') {
    return this.ordersService.findAll(order);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(+id);
  }
}
