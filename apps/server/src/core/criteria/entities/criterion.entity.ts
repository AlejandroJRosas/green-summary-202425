import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'

@Entity()
export class Criterion {
  @PrimaryColumn()
  indicatorIndex: number

  @PrimaryGeneratedColumn()
  subIndex: number

  @Column()
  name: string

  @Column()
  alias: string

  @Column('text')
  helpText: string

  @Column()
  requiresEvidence: boolean

  @ManyToOne(() => Indicator, (indicator) => indicator.criteria)
  indicator: Indicator
}
