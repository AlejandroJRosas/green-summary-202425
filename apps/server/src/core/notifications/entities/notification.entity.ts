import { User } from 'src/core/users/entities/user.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  CreateDateColumn
} from 'typeorm'

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'boolean', default: false, nullable: false })
  seen: boolean

  @Column({ type: 'text', nullable: false })
  description: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.notifications)
  user: User
}
