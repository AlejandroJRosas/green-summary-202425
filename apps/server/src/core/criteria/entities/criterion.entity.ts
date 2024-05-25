import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { CriteriaPerRecopilation } from 'src/core/criteria_per_recopilations/entities/criteria_per_recopilation.entity'

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

  @OneToMany(
    () => CriteriaPerRecopilation,
    (criteriaPerRecopilation) => criteriaPerRecopilation.recopilation
  )
  criteriaPerRecopilations: CriteriaPerRecopilation[]

  //TODO: RELATION WITH CATEGORIZED CRITERIA (RECOPILATION AND CATEGORY)
}
