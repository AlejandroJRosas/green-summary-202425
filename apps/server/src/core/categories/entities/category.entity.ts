import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm'

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'text' })
  textHelp: string

  @ManyToOne(() => Indicator, (indicator) => indicator.category)
  indicator: Indicator
}
