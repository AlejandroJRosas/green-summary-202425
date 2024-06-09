import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from 'src/core/categories/entities/category.entity'
import { DepartmentPerRecopilation } from 'src/core/departments-per-recopilations/entities/departments-per-recopilation.entity'

@Entity('recommendations')
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => DepartmentPerRecopilation,
    (departmentPerRecopilation) => departmentPerRecopilation.recommendations
  )
  departmentPerRecopilation: DepartmentPerRecopilation

  @ManyToOne(() => Category, (category) => category.recommendations)
  category: Category
}
