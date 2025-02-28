import { Injectable } from '@nestjs/common';
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

  async findAll(): Promise<Clients[]> {
    return this.clientsRepository.find();
  }

  async findOne(id: number): Promise<Clients | null> {
    return this.clientsRepository.findOneBy({ id });
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
