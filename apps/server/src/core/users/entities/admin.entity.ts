import { ChildEntity } from 'typeorm'
import { User } from './user.entity'
import { UserTypes } from '../constants'

@ChildEntity(UserTypes.ADMIN)
export class Admin extends User {}
