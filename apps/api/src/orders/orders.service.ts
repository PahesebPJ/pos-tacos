import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/orders.entity';
import { TablesService } from 'src/tables/tables.service';
import { ClientsService } from 'src/clients/clients.service';

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
    const tableFound = await this.tablesService.findOne(
      createOrderDto.tablesId,
    );

    const clientFound = await this.clientsService.findOne(
      createOrderDto.clientsId,
    );

    if (this.isHttpException(tableFound) || this.isHttpException(clientFound)) {
      return new HttpException(
        'Table or Client not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const newOrder = this.ordersRepository.create(createOrderDto);

    return this.ordersRepository.save(newOrder);
  }

  async findAll() {
    const ordersFound = await this.ordersRepository.find({
      relations: ['tables', 'clients'],
    });

    if (!ordersFound) {
      return new HttpException('Orders not found', HttpStatus.NOT_FOUND);
    }

    return ordersFound;
  }

  async findOne(id: number) {
    const orderFound = await this.ordersRepository.findOne({ where: { id } });

    if (!orderFound) {
      return new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return orderFound;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderFound = await this.ordersRepository.findOne({ where: { id } });

    if (!orderFound) {
      return new HttpException(
        'The order could not be updated, because it does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.ordersRepository.update(id, updateOrderDto);
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
