import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './entities/clients.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepository: Repository<Clients>,
  ) {}

  async findAll(order: 'ASC' | 'DESC'): Promise<Clients[]> {
    return this.clientsRepository.find({ order: { id: order } });
  }

  async findOne(id: number): Promise<Clients | HttpException> {
    const clientFound = await this.clientsRepository.findOneBy({ id });

    if (!clientFound) {
      return new HttpException('Client not found', 404);
    }

    return clientFound;
  }

  create(createClientDto: CreateClientDto) {
    const newClient = this.clientsRepository.create(createClientDto);

    return this.clientsRepository.save(newClient);
  }

  update(id: number, createClientDto: CreateClientDto) {
    return this.clientsRepository.update(id, createClientDto);
  }

  async delete(id: number) {
    return this.clientsRepository.delete(id);
  }
}
