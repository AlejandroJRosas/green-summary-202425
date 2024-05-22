import { ChildEntity } from 'typeorm'
import { User } from './user.entity'
import { UserTypes } from '../constants'

@ChildEntity(UserTypes.DEPARTMENT)
export class Department extends User {
  //TODO: RELATIONS WITH OTHER ENTITIES
}
