import { ChildEntity, OneToMany } from 'typeorm'
import { User } from './user.entity'
import { USER_TYPES } from '../users.constants'
import { DepartmentPerRecopilation } from 'src/core/departments-per-recopilations/entities/departments-per-recopilation.entity'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'

@ChildEntity(USER_TYPES.DEPARTMENT)
export class Department extends User {
  @OneToMany(
    () => InformationCollection,
    (informationCollection) => informationCollection.department
  )
  informationCollections: InformationCollection[]

  @OneToMany(
    () => DepartmentPerRecopilation,
    (departmentPerRecopilation) => departmentPerRecopilation.department
  )
  recopilationsPerDepartment: DepartmentPerRecopilation[]
}
