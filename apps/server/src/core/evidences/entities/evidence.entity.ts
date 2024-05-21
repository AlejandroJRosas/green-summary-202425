import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  TableInheritance
} from 'typeorm'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'
import { EvidenceType } from '../constants'

@Entity('evidences')
@TableInheritance({
  column: { type: 'enum', enum: EvidenceType, name: 'type' }
})
export class Evidence {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'text' })
  error: string

  @Column({
    type: 'enum',
    enum: EvidenceType
  })
  type: EvidenceType

  @ManyToOne(() => InformationCollection, (collection) => collection.evidences)
  @JoinColumn({ name: 'collection_id' })
  collection: InformationCollection
}
