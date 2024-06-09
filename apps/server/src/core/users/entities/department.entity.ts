import { ChildEntity, OneToMany } from 'typeorm'
import { User } from './user.entity'
import { USER_TYPES } from '../users.constants'
import { Answer } from 'src/core/answers/entities/answer.entity'
import { DepartmentPerRecopilation } from 'src/core/departments-per-recopilations/entities/departments-per-recopilation.entity'

@ChildEntity(USER_TYPES.DEPARTMENT)
export class Department extends User {
  @OneToMany(() => Answer, (answer) => answer.department)
  answers: Answer[]

  @OneToMany(
    () => DepartmentPerRecopilation,
    (departmentPerRecopilation) => departmentPerRecopilation.department
  )
  recopilationsPerDepartment: DepartmentPerRecopilation[]
}
