import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'

@Entity('criteria')
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

  @Column({ default: false })
  requiresEvidence: boolean

  @ManyToOne(() => Indicator, (indicator) => indicator.criteria)
  indicator: Indicator

  //TODO: RELATION WITH CATEGORIZED CRITERIA (RECOPILATION AND CATEGORY)
}
