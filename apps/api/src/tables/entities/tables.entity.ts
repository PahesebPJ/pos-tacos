import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  status: number;
}
