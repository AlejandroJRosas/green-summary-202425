import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'

@Entity('evidences')
export class Evidence {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'date' })
  uploadDate: Date

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'text' })
  error: string

  @Column({ type: 'varchar', length: 25 })
  type: string

  @Column({ type: 'text', nullable: true })
  externalLink: string

  @Column({ type: 'text', nullable: true })
  fileLink: string

  @ManyToOne(() => InformationCollection, (collection) => collection.evidences)
  @JoinColumn({ name: 'id_collection' })
  collection: InformationCollection
}
