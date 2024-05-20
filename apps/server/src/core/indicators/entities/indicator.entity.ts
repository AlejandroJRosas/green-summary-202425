import { Category } from 'src/core/categories/entities/category.entity'
import { Criterion } from 'src/core/criteria/entities/criterion.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('indicators')
export class Indicator {
  @PrimaryGeneratedColumn()
  index: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 255 })
  alias: string

  @Column({ type: 'text' })
  textHelp: string

  @OneToMany(() => Category, (category) => category.indicator)
  category: Category[]

  @OneToMany(() => Criterion, (criteria) => criteria.indicator)
  criteria: Criterion[]

  //TODO: RELATION WITH RECOPILATION
}
