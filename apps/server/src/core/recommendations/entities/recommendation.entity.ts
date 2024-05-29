import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from 'src/core/categories/entities/category.entity'
import { Department } from 'src/core/users/entities/department.entity'

@Entity('recommendations')
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Department, (department) => department.recommendations)
  department: Department

  @ManyToOne(() => Category, (category) => category.recommendations)
  category: Category
}
