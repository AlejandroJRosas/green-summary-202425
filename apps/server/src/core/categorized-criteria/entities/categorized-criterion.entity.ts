import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Criterion } from 'src/core/criteria/entities/criterion.entity'
import { Category } from 'src/core/categories/entities/category.entity'

@Entity('categorized_criteria')
export class CategorizedCriteria {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Recopilation)
  @JoinColumn({ name: 'RecopilationId' })
  recopilation: Recopilation

  @ManyToOne(() => Criterion, (criterion) => criterion.categorizedCriteria)
  @JoinColumn({
    name: 'indicatorIndex',
    referencedColumnName: 'indicatorIndex'
  })
  @JoinColumn({ name: 'subIndex', referencedColumnName: 'subIndex' })
  criterion: Criterion

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'CategoryId' })
  category: Category
}
