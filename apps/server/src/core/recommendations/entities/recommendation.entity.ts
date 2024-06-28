import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Category } from 'src/core/categories/entities/category.entity'
import { DepartmentPerRecopilation } from 'src/core/departments-per-recopilations/entities/departments-per-recopilation.entity'

@Entity('recommendations')
@Unique(['departmentPerRecopilation', 'category'])
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => DepartmentPerRecopilation,
    (departmentPerRecopilation) => departmentPerRecopilation.recommendations,
    { onDelete: 'CASCADE' }
  )
  departmentPerRecopilation: DepartmentPerRecopilation

  @ManyToOne(() => Category, (category) => category.recommendations)
  category: Category
}
