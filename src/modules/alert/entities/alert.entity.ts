import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamptz' })
  createdAt: Date

  @Column()
  rate: string

  @Column()
  pair: string

  @Column('numeric', { precision: 30, scale: 2 })
  change: number
}