import { Orders } from 'src/orders/entities/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToMany(() => Orders, (orders) => orders.clients)
  orders: Orders[];
}
