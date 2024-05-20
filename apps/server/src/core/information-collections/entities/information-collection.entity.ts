import { Evidence } from 'src/core/evidences/entities/evidence.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn
} from 'typeorm'

@Entity('information_collections')
export class InformationCollection {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  summary: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date

  @OneToMany(() => Evidence, (evidence) => evidence.collection)
  evidences: Evidence[]
}
