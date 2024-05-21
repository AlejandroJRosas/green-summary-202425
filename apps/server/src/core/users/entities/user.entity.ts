import { Notification } from 'src/core/notifications/entities/notification.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity({ name: 'users' })
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
}
