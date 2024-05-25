import { Category } from 'src/core/categories/entities/category.entity'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from 'typeorm'

@Entity('categories_per_recopilations')
export class CategoriesPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Recopilation, { eager: true })
  @JoinColumn({ name: 'IDRecopilation' })
  recopilation: Recopilation

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'IDCategory' })
  category: Category
}
