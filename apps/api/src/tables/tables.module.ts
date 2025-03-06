import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TableController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tables } from './entities/tables.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tables])],
  controllers: [TableController],
  providers: [TablesService],
  exports: [TablesService],
})
export class TablesModule {}
