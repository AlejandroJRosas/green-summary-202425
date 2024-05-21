import { ChildEntity } from 'typeorm'
import { User } from './user.entity'

@ChildEntity()
export class Coordinator extends User {}
