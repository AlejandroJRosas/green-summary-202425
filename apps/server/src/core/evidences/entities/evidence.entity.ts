import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  TableInheritance
} from 'typeorm'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'
import { EvidenceType } from '../evidences.constants'

@Entity('evidences')
@TableInheritance({
  column: { type: 'enum', enum: EvidenceType, name: 'type' }
})
export abstract class Evidence {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false
  })
  createdAt: Date

  @Column({ type: 'text', nullable: false })
  description: string

  @Column({ type: 'text', nullable: false })
  error: string

  @Column({
    type: 'enum',
    enum: EvidenceType,
    nullable: false
  })
  type: EvidenceType

  @ManyToOne(
    () => InformationCollection,
    (collection) => collection.evidences,
    { onDelete: 'CASCADE' }
  )
  collection: InformationCollection
}
