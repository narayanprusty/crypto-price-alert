import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Webhook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string
}