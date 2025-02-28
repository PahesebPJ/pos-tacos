import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tables } from './entities/tables.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Tables)
    private readonly tableRepository: Repository<Tables>,
  ) {}

  create(createTableDto: CreateTableDto) {
    const newTable = this.tableRepository.create(createTableDto);

    return this.tableRepository.save(newTable);
  }

  async findAll(order: 'ASC' | 'DESC') {
    const tableFound = await this.tableRepository.find({
      order: {
        id: order,
      },
    });

    if (!tableFound) {
      return new HttpException('Tables not found', HttpStatus.NOT_FOUND);
    }

    return tableFound;
  }

  async findOne(id: number) {
    const tableFound = await this.tableRepository.findOne({
      where: {
        id,
      },
    });

    if (!tableFound) {
      return new HttpException('Table not found', HttpStatus.NOT_FOUND);
    }

    return tableFound;
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    const tableFound = await this.tableRepository.findOne({ where: { id } });

    if (!tableFound) {
      return new HttpException(
        'The table could not be updated, because it does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.tableRepository.update(id, updateTableDto);
  }

  async delete(id: number) {
    const rowAffected = await this.tableRepository.delete(id);

    if (rowAffected.affected === 0) {
      return new HttpException(
        'The table could not be deleted, because it does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return rowAffected;
  }
}
