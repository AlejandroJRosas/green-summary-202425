import { User } from 'src/core/users/entities/user.entity'
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm'

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  view: string

  @Column()
  creationDate: string

  @ManyToOne(() => User, (user) => user.notifications)
  user: User
}
