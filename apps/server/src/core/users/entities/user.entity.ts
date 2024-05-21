import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TableInheritance,
  OneToMany
} from 'typeorm'
import { UserTypes } from '../constants'
import { Notification } from 'src/core/notifications/entities/notification.entity'


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

  @OneToMany(() => Notification, (notifications) => notifications.user)
  notifications: Notification[]

  @Column({ type: 'enum', enum: UserTypes })
  type: UserTypes
}
