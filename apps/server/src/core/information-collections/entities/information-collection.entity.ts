import { Category } from 'src/core/categories/entities/category.entity'
import { Evidence } from 'src/core/evidences/entities/evidence.entity'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Department } from 'src/core/users/entities/department.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  Unique
} from 'typeorm'

@Unique(['recopilation', 'department', 'category'])
@Entity('information_collections')
export class InformationCollection {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.informationCollections
  )
  recopilation: Recopilation

  @ManyToOne(
    () => Department,
    (department) => department.informationCollections
  )
  department: Department

  @ManyToOne(() => Category, (category) => category.informationCollections)
  category: Category

  @Column({ type: 'text' })
  summary: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date

  @OneToMany(() => Evidence, (evidence) => evidence.collection)
  evidences: Evidence[]
}
