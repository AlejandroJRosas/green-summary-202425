import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('recopilations')
export class Recopilation {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 30 })
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'date' })
  startDate: Date

  @Column({ type: 'date' })
  departmentEndDate: Date

  @Column({ type: 'date' })
  endDate: Date

  //TODO: RELATIONS
}
