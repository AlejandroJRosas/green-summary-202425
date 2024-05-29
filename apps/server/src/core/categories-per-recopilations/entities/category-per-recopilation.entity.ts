import { Category } from 'src/core/categories/entities/category.entity'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm'

@Entity('categories_per_recopilations')
export class CategoryPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Recopilation, (recopilation) => recopilation.categories)
  recopilation: Recopilation

  @ManyToOne(() => Category, (category) => category.recopilations)
  category: Category
}
