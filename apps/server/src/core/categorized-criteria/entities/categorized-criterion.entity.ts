import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'
import { Category } from 'src/core/categories/entities/category.entity'

@Entity('categorized_criterion')
export class CategorizedCriteria {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.categorizedCriterion
  )
  recopilation: Recopilation

  @ManyToOne(() => Criteria, (criterion) => criterion.categorizedCriterion)
  criteria: Criteria

  @ManyToOne(() => Category, (category) => category.categorizedCriterion)
  category: Category
}
