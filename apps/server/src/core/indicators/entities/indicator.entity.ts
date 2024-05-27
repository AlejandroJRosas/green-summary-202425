import { Category } from 'src/core/categories/entities/category.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'
import { IndicatorPerRecopilation } from 'src/core/indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
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

  @OneToMany(() => Criteria, (criteria) => criteria.indicator)
  criteria: Criteria[]

  @OneToMany(
    () => IndicatorPerRecopilation,
    (indicatorsPorRecopilations) => indicatorsPorRecopilations.indicator
  )
  indicatorsPerRecopilations: IndicatorPerRecopilation[]

  //TODO: RELATION WITH RECOPILATION
}
