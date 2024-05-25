import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/core/users/entities/user.entity'
import { Category } from 'src/core/categories/entities/category.entity'
import { Department } from 'src/core/users/entities/department.entity'

@Entity('recommendations')
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Department, (department) => department.recommendations)
  department: User

  @ManyToOne(() => Category, (category) => category.recommendations)
  category: Category
}
