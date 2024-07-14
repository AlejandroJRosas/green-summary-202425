import { Category } from 'src/core/categories/entities/category.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'
import { IndicatorPerRecopilation } from 'src/core/indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  DeleteDateColumn,
  Unique
} from 'typeorm'

@Unique(['name', 'deletedAt'])
@Entity('indicators')
export class Indicator {
  @PrimaryColumn()
  index: number

  @Column({ type: 'varchar', length: 255, nullable: false })
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

  @DeleteDateColumn()
  /* @PrimaryColumn() */
  deletedAt: Date
}
