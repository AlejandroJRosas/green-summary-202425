import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TableInheritance
} from 'typeorm'
import { UserTypes } from '../constants'

@Entity({ name: 'users' })
@TableInheritance({ column: { type: 'enum', enum: UserTypes, name: 'type' } })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ type: 'enum', enum: UserTypes })
  type: UserTypes
}
