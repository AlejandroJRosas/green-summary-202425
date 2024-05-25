import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Department } from 'src/core/users/entities/department.entity'
import { Category } from 'src/core/categories/entities/category.entity'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Recopilation)
  @JoinColumn({ name: 'IDRecopilation' })
  recopilation: Recopilation

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'IDDepartment' })
  department: Department

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'IDCategory' })
  category: Category

  @ManyToOne(() => InformationCollection)
  @JoinColumn({ name: 'IDCollection' })
  informationCollection: InformationCollection
}
