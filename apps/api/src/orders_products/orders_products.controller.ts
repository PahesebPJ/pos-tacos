import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrdersProductsService } from './orders_products.service';
import { GetCommandDto } from './dto/get-command.dto';
import { CreateOrdersProductsDto } from './dto/create-orders_products.dto';
import { UpdateOrderProductDto } from './dto/update-orders_products.dto';

@Controller('orders-products')
export class OrdersProductsController {
  constructor(private readonly ordersProductsService: OrdersProductsService) {}

  @Get()
  async findAll(@Query('order') order: 'ASC' | 'DESC') {
    return this.ordersProductsService.findAll(order);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const orderProduct = await this.ordersProductsService.findOneById(id);

    if (!orderProduct) {
      throw new HttpException('Order_product not found!', HttpStatus.NOT_FOUND);
    }

    return orderProduct;
  }

  @Get('filter')
  async getCommandByDateOrId(@Body() query: GetCommandDto) {
    return this.ordersProductsService.getCommandByDateOrId(query);
  }

  @Post()
  async create(@Body() createOrdersProductsDto: CreateOrdersProductsDto) {
    return this.ordersProductsService.create(createOrdersProductsDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderProductDto: UpdateOrderProductDto,
  ) {
    return this.ordersProductsService.update(id, updateOrderProductDto);
  }
}
