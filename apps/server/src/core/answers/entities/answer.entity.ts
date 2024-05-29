import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Department } from 'src/core/users/entities/department.entity'
import { Category } from 'src/core/categories/entities/category.entity'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Recopilation, (recopilation) => recopilation.answers)
  recopilation: Recopilation

  @ManyToOne(() => Department, (department) => department.answers)
  department: Department

  @ManyToOne(() => Category, (category) => category.answers)
  category: Category

  @ManyToOne(
    () => InformationCollection,
    (informationCollection) => informationCollection.answers
  )
  informationCollection: InformationCollection
}
