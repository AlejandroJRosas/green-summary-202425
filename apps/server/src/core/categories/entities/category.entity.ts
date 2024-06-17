import { Answer } from 'src/core/answers/entities/answer.entity'
import { CategorizedCriteria } from 'src/core/categorized-criteria/entities/categorized-criterion.entity'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { Recommendation } from 'src/core/recommendations/entities/recommendation.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  OneToMany
} from 'typeorm'

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'text' })
  helpText: string

  @ManyToOne(() => Indicator, (indicator) => indicator.categories, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  indicator: Indicator

  @OneToMany(() => Recommendation, (recommendation) => recommendation.category)
  recommendations: Recommendation[]

  @OneToMany(() => Answer, (answers) => answers.category)
  answers: Answer[]

  @OneToMany(
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.category
  )
  categorizedCriterion: CategorizedCriteria[]
}
