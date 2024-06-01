import { ChildEntity } from 'typeorm'
import { User } from './user.entity'
import { USER_TYPES } from '../users.constants'

@ChildEntity(USER_TYPES.ADMIN)
export class Admin extends User {}
