import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders_Products } from './entities/orders_products.entity';
import { Repository } from 'typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { CreateOrdersProductsDto } from './dto/create-orders_products.dto';
import { Orders } from 'src/orders/entities/orders.entity';
import { Products } from 'src/products/entities/products.entity';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectRepository(Orders_Products)
    private readonly ordersProductsRepository: Repository<Orders_Products>,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  private isHttpException(service: object): boolean {
    return service instanceof HttpException;
  }

  async create(createOrdersProductsDto: CreateOrdersProductsDto) {
    const order = await this.ordersService.findOne(
      createOrdersProductsDto.id_order,
    );

    const product = await this.productsService.findOne(
      createOrdersProductsDto.id_product,
    );

    if (this.isHttpException(order) || this.isHttpException(product)) {
      return new HttpException(
        'Order or Product not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.ordersProductsRepository.save({
      ...createOrdersProductsDto,
      order: order as Orders,
      product: product as Products,
    });
  }
}
