import { User } from 'src/core/users/entities/user.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  CreateDateColumn
} from 'typeorm'
import {
  NOTIFICATION_TYPES,
  NotificationType
} from '../notifications.constants'

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'boolean', default: false, nullable: false })
  seen: boolean

  @Column({ type: 'text', nullable: false })
  description: string

  @Column({
    type: 'enum',
    nullable: false,
    enum: Object.values(NOTIFICATION_TYPES)
  })
  type: NotificationType

  @Column({
    type: 'json',
    nullable: true
  })
  data: Record<string, unknown>

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.notifications)
  user: User
}
