import { Orders_Products } from 'src/orders_products/entities/orders_products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  price: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  url: string;

  @OneToMany(
    () => Orders_Products,
    (orders_products) => orders_products.product,
  )
  orders_products: Orders_Products[];
}
