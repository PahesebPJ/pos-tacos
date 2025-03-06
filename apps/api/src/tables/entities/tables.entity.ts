import { Orders } from 'src/orders/entities/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  status: number;

  @OneToMany(() => Orders, (orders) => orders.tables)
  orders: Orders[];
}
