import { Clients } from 'src/clients/entities/clients.entity';
import { Tables } from 'src/tables/entities/tables.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Tables, (table) => table.orders)
  @JoinColumn({ name: 'table_id' })
  tables: Tables;

  @JoinColumn({ name: 'client_id' })
  @ManyToOne(() => Clients, (client) => client.orders)
  clients: Clients;
}
