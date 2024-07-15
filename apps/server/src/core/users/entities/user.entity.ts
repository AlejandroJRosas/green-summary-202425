import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TableInheritance,
  OneToMany,
  Unique,
  DeleteDateColumn
} from 'typeorm'
import { USER_TYPES, UserType } from '../users.constants'
import { Notification } from 'src/core/notifications/entities/notification.entity'

@Entity({ name: 'users' })
@Unique(['email', 'deletedAt'])
@TableInheritance({
  column: { type: 'enum', enum: Object.values(USER_TYPES), name: 'type' }
})
export abstract class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  fullName: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false, select: false })
  password: string

  @OneToMany(() => Notification, (notifications) => notifications.user)
  notifications: Notification[]

  @Column({ type: 'enum', enum: Object.values(USER_TYPES), nullable: false })
  type: UserType

  @DeleteDateColumn()
  deletedAt: Date
}
