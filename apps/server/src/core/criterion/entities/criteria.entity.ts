import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { CriteriaPerRecopilation } from 'src/core/criterion-per-recopilations/entities/criteria-per-recopilation.entity'
import { CategorizedCriteria } from 'src/core/categorized-criteria/entities/categorized-criterion.entity'

@Entity('criterion')
export class Criteria {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  subIndex: number

  @Column()
  name: string

  @Column()
  alias: string

  @Column('text')
  helpText: string

  @Column({ default: false })
  requiresEvidence: boolean

  @ManyToOne(() => Indicator, (indicator) => indicator.criterion)
  indicator: Indicator

  @OneToMany(
    () => CriteriaPerRecopilation,
    (criteriaPerRecopilation) => criteriaPerRecopilation.recopilation
  )
  recopilationsPerCriteria: CriteriaPerRecopilation[]

  @OneToMany(
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.criterion
  )
  categorizedCriterion: CategorizedCriteria[]
}
