import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'
import { Category } from 'src/core/categories/entities/category.entity'

@Entity('categorized_criteria')
export class CategorizedCriteria {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Recopilation)
  @JoinColumn({ name: 'RecopilationId' })
  recopilation: Recopilation

  @ManyToOne(() => Criteria, (criterion) => criterion.categorizedCriteria)
  @JoinColumn({
    name: 'indicatorIndex',
    referencedColumnName: 'indicatorIndex'
  })
  @JoinColumn({ name: 'subIndex', referencedColumnName: 'subIndex' })
  criterion: Criteria

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'CategoryId' })
  category: Category
}
