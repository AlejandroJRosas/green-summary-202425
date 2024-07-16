import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'
import { Category } from 'src/core/categories/entities/category.entity'

@Entity('categorized_criterion')
@Unique(['recopilation', 'criteria'])
export class CategorizedCriteria {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.categorizedCriterion,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  recopilation: Recopilation

  @ManyToOne(() => Criteria, (criterion) => criterion.categorizedCriterion)
  criteria: Criteria

  @ManyToOne(() => Category, (category) => category.categorizedCriterion)
  category: Category
}
