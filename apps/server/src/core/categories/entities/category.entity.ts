import { Answer } from 'src/core/answers/entities/answer.entity'
import { CategoryPerRecopilation } from 'src/core/categories-per-recopilations/entities/category-per-recopilation.entity'
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

  @ManyToOne(() => Indicator, (indicator) => indicator.categories)
  indicator: Indicator

  @OneToMany(() => Recommendation, (recommendation) => recommendation.category)
  recommendations: Recommendation[]

  @OneToMany(() => Answer, (answers) => answers.category)
  answers: Answer[]

  @OneToMany(
    () => CategoryPerRecopilation,
    (categoriesPerRecopilations) => categoriesPerRecopilations.category
  )
  recopilations: CategoryPerRecopilation[]

  @OneToMany(
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.category
  )
  categorizedCriterion: CategorizedCriteria[]
}
