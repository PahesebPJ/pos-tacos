import { Module } from '@nestjs/common';
import { OrdersProductsService } from './orders_products.service';
import { OrdersProductsController } from './orders_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders_Products } from './entities/orders_products.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders_Products]),
    OrdersModule,
    ProductsModule,
  ],
  providers: [OrdersProductsService],
  controllers: [OrdersProductsController],
  exports: [OrdersProductsService],
})
export class OrdersProductsModule {}
