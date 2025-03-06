import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesModule } from './tables/tables.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { connection } from './connection';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersProductsController } from './orders_products/orders_products.controller';
import { OrdersProductsModule } from './orders_products/orders_products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connection.host,
      port: connection.port ? parseInt(connection.port) : 5432,
      username: connection.username,
      password: connection.password,
      database: connection.database,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TablesModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    ClientsModule,
    OrdersModule,
    OrdersProductsModule,
  ],
  controllers: [AppController, OrdersProductsController],
  providers: [AppService],
})
export class AppModule {}
