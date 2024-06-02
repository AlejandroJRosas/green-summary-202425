import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Department } from 'src/core/users/entities/department.entity'

@Entity('departments_per_recopilations')
export class DepartmentPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

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
