import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Clients } from './entities/clients.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(): Promise<Clients[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number): Promise<Clients | null> {
    return this.clientsService.findOne(+id);
  }

  @Post()
  create(@Body() client: Clients) {
    return this.clientsService.create(client);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createClientDto: CreateClientDto) {
    return this.clientsService.update(+id, createClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.clientsService.delete(+id);
  }
}
