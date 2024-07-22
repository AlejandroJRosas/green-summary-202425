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
  ManyToOne
} from 'typeorm'

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

  @Column({ type: 'text', nullable: false })
  name: string

  @Column({ type: 'text', nullable: false })
  summary: string

  @Column({ type: 'bool', nullable: false, default: false })
  isApproved: boolean

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false
  })
  createdAt: Date

  @OneToMany(() => Evidence, (evidence) => evidence.collection)
  evidences: Evidence[]
}
