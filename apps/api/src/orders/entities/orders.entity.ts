import { Clients } from 'src/clients/entities/clients.entity';
import { Orders_Products } from 'src/orders_products/entities/orders_products.entity';
import { Tables } from 'src/tables/entities/tables.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  total: number;

  @JoinColumn({ name: 'table_id' })
  @ManyToOne(() => Tables, (table) => table.orders)
  tables: Tables;

  @JoinColumn({ name: 'client_id' })
  @ManyToOne(() => Clients, (client) => client.orders)
  clients: Clients;

  @OneToMany(() => Orders_Products, (orders_products) => orders_products.order)
  orders_products: Orders_Products[];
}
