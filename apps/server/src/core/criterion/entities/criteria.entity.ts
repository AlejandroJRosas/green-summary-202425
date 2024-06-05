import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
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
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.criterion
  )
  categorizedCriterion: CategorizedCriteria[]
}
