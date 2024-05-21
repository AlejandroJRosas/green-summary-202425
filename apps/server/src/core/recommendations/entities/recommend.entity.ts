import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from 'src/core/users/entities/user.entity'
import { Category } from 'src/core/categories/entities/category.entity'

@Entity('recommends')
export class Recommend {
  @PrimaryColumn()
  IDDepartamento: number

  @PrimaryColumn()
  IDCategoria: number

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'IDDepartamento' })
  departamento: User

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'IDCategoria' })
  categoria: Category
}
