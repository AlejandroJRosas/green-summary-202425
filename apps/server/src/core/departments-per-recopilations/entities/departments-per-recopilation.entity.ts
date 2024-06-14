import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany
} from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Department } from 'src/core/users/entities/department.entity'
import { Recommendation } from 'src/core/recommendations/entities/recommendation.entity'

@Entity('departments_per_recopilations')
@Unique(['recopilation', 'department'])
export class DepartmentPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.departmentPerRecopilation
  )
  recommendations: Recommendation[]

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.departmentsPerRecopilation
  )
  recopilation: Recopilation

  @ManyToOne(
    () => Department,
    (department) => department.recopilationsPerDepartment
  )
  department: Department
}
