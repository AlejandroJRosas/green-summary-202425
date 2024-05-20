import { Evidence } from 'src/core/evidences/entities/evidence.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity('information_collections')
export class InformationCollection {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  summary: string

  @Column({ type: 'date' })
  creationDate: Date

  @OneToMany(() => Evidence, (evidence) => evidence.collection)
  evidences: Evidence[]
}
