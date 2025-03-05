import { Orders } from 'src/orders/entities/orders.entity';
import { Products } from 'src/products/entities/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Orders_Products {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'id_order' })
  @ManyToOne(() => Orders, (order) => order.orders_products)
  order: Orders;

  @JoinColumn({ name: 'id_product' })
  @ManyToOne(() => Products, (product) => product.orders_products)
  product: Products;

  @Column()
  quantity: number;

  @Column()
  discount: number;
}
