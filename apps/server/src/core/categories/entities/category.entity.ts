import { CategoryPerRecopilation } from 'src/core/categories-per-recopilations/entities/category-per-recopilation.entity'
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

  @ManyToOne(() => Indicator, (indicator) => indicator.category)
  indicator: Indicator

  @OneToMany(() => Recommendation, (recommendation) => recommendation.category)
  recommendations: Recommendation[]

  @OneToMany(
    () => CategoryPerRecopilation,
    (categoriesPerRecopilations) => categoriesPerRecopilations.category
  )
  categoriesPerRecopilations: CategoryPerRecopilation[]
}
