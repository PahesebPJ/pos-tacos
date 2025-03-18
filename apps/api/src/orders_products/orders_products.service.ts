import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders_Products } from './entities/orders_products.entity';
import { Repository } from 'typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { CreateOrdersProductsDto } from './dto/create-orders_products.dto';
import { Orders } from 'src/orders/entities/orders.entity';
import { Products } from 'src/products/entities/products.entity';
import { UpdateOrderProductDto } from './dto/update-orders_products.dto';
import { GetCommandDto } from './dto/get-command.dto';

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

  async findAll(order: 'ASC' | 'DESC') {
    const order_products = await this.ordersProductsRepository.find({
      order: { id: order },
    });

    if (!order_products) {
      return new HttpException('OrderProducts not found', HttpStatus.NOT_FOUND);
    }

    return order_products;
  }

  async findOneById(id: number) {
    return await this.ordersProductsRepository.findOneBy({ id });
  }

  /* private toLocalISOString(date: Date): string {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString();
  } */

  private toLocalISOString(date: Date): string {
    const offset = date.getTimezoneOffset();
    const offsetSign = offset > 0 ? '-' : '+';
    const offsetHours = String(Math.abs(Math.floor(offset / 60))).padStart(
      2,
      '0',
    );
    const offsetMinutes = String(Math.abs(offset % 60)).padStart(2, '0');
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    const isoString = localDate.toISOString();
    return (
      isoString.slice(0, -1) + offsetSign + offsetHours + ':' + offsetMinutes
    );
  }

  private formatDateToLocal(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };

    return date.toLocaleString('es-MX', options);
  }

  async getCommandByDateOrId({
    start_date,
    end_date,
    order_id,
  }: GetCommandDto) {
    //If no dates provided
    if (!start_date || !end_date) {
      const now = new Date();

      //Start date
      const defaultStartDate = new Date(now);
      defaultStartDate.setHours(18, 0, 0, 0); //6PM today

      //End date
      const defaultEndDate = new Date(now);
      defaultEndDate.setDate(defaultEndDate.getDate() + 1); //tomorrow
      defaultEndDate.setHours(9, 0, 0, 0);

      // start_date = defaultStartDate.toISOString();
      // end_date = defaultEndDate.toISOString();
      start_date = this.toLocalISOString(defaultStartDate);
      end_date = this.toLocalISOString(defaultEndDate);

      console.log({ start_date, end_date });
    }

    const query = this.ordersProductsRepository
      .createQueryBuilder('op')
      .select([
        'op.id',
        'op.id_order',
        'op.id_product',
        'p.name',
        'p.price',
        'o.total',
        'op.discount',
        'op.quantity',
        'o.date',
      ])
      .leftJoin('op.order', 'o')
      .leftJoin('op.product', 'p');

    if (order_id) {
      query.where('op.id_order = :order_id', { order_id });
    } else {
      query.where('o.date::text BETWEEN :startDate AND :endDate', {
        startDate: start_date,
        endDate: end_date,
      });
    }

    const results = await query.getRawMany();

    const formattedResults = results.map((result) => ({
      ...result,
      o_date: this.formatDateToLocal(result.o_date),
    }));

    return formattedResults;
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

  async update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    const order_product = await this.ordersProductsRepository.findOne({
      where: { id },
    });

    if (!order_product) {
      return new HttpException(
        'The order_product could not be updated, because it does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.ordersProductsRepository.update(id, updateOrderProductDto);
  }
}
