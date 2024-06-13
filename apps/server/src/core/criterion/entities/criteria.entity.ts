import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { CategorizedCriteria } from 'src/core/categorized-criteria/entities/categorized-criterion.entity'

@Entity('criterion')
@Unique(['subIndex', 'indicator'])
export class Criteria {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  subIndex: number

  @Column()
  name: string

  @Column()
  alias: string

  @Column('text')
  helpText: string

  @Column({ default: false })
  requiresEvidence: boolean

  @ManyToOne(() => Indicator, (indicator) => indicator.criterion, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  indicator: Indicator

  @OneToMany(
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.criteria
  )
  categorizedCriterion: CategorizedCriteria[]
}
