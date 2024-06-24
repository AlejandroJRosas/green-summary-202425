import { Category } from 'src/core/categories/entities/category.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'
import { IndicatorPerRecopilation } from 'src/core/indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm'

@Entity('indicators')
export class Indicator {
  @PrimaryColumn()
  index: number

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  alias: string

  @Column({ type: 'text', nullable: false })
  helpText: string

  @OneToMany(() => Category, (category) => category.indicator)
  categories: Category[]

  @OneToMany(() => Criteria, (criteria) => criteria.indicator)
  criterion: Criteria[]

  @OneToMany(
    () => IndicatorPerRecopilation,
    (indicatorPorRecopilations) => indicatorPorRecopilations.indicator
  )
  recopilationsPerIndicator: IndicatorPerRecopilation[]
}
