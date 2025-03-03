import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/orders.entity';
import { TablesService } from 'src/tables/tables.service';
import { ClientsService } from 'src/clients/clients.service';
import { Tables } from 'src/tables/entities/tables.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    private readonly tablesService: TablesService,
    private readonly clientsService: ClientsService,
  ) {}

  private isHttpException(service: object): boolean {
    return service instanceof HttpException;
  }

  async create(createOrderDto: CreateOrderDto) {
    const tables = await this.tablesService.findOne(createOrderDto.tablesId);

    const clients = await this.clientsService.findOne(createOrderDto.clientsId);

    if (this.isHttpException(tables) || this.isHttpException(clients)) {
      return new HttpException(
        'Table or Client not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.ordersRepository.save({
      ...createOrderDto,
      tables: tables as Tables,
      clients,
    });
  }

  async findAll(order: 'ASC' | 'DESC') {
    const ordersFound = await this.ordersRepository.find({
      relations: ['tables', 'clients'],
      order: { id: order },
    });

    if (!ordersFound) {
      return new HttpException('Orders not found', HttpStatus.NOT_FOUND);
    }

    return ordersFound;
  }

  async findOne(id: number) {
    const orderFound = await this.ordersRepository.findOne({
      where: { id },
      relations: ['tables', 'clients'],
    });

    if (!orderFound) {
      return new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return orderFound;
  }

  async update(id: number, updateOrderDto: CreateOrderDto) {
    const orderFound = await this.ordersRepository.findOne({ where: { id } });
    const tables = await this.tablesService.findOne(updateOrderDto.tablesId);
    const clients = await this.clientsService.findOne(updateOrderDto.clientsId);

    if (!orderFound) {
      return new HttpException(
        'The order could not be updated, because it does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    if (this.isHttpException(tables) || this.isHttpException(clients)) {
      return new HttpException(
        'Table or Client not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.ordersRepository.update(id, {
      ...orderFound,
      status: updateOrderDto.status,
      total: updateOrderDto.total,
      tables: tables as Tables,
      clients,
    });
  }

  async delete(id: number) {
    const rowAffected = await this.ordersRepository.delete(id);

    if (rowAffected.affected === 0) {
      return new HttpException(
        'The order could not be deleted, because it does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return rowAffected;
  }
}
