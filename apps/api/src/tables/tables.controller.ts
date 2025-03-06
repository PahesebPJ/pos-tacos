import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpException,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Tables } from './entities/tables.entity';

@Controller('tables')
export class TableController {
  constructor(private readonly TablesService: TablesService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.TablesService.create(createTableDto);
  }

  @Get()
  findAll(@Query('order') order: 'ASC' | 'DESC') {
    return this.TablesService.findAll(order);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tables | HttpException> {
    return this.TablesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.TablesService.update(+id, updateTableDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.TablesService.delete(+id);
  }
}
