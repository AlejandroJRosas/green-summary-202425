import { ChildEntity } from 'typeorm'
import { User } from './user.entity'

@ChildEntity()
export class Department extends User {
  //TODO: RELATIONS WITH OTHER ENTITIES
}
