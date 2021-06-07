import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Monitor extends BaseEntity {
  @PrimaryColumn()
  pair: string;

  @Column('numeric', { precision: 30, scale: 2 })
  change: number;

  @Column('numeric', { precision: 30, scale: 0 })
  interval: number;
}