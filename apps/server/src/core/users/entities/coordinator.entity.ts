import { ChildEntity } from 'typeorm'
import { User } from './user.entity'
import { UserTypes } from '../constants'

@ChildEntity(UserTypes.COORDINATOR)
export class Coordinator extends User {}
