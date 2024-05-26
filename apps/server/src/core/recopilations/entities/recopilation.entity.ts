import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { IndicatorPerRecopilation } from 'src/core/indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
import { CategoryPerRecopilation } from 'src/core/categories-per-recopilations/entities/category-per-recopilation.entity'
import { CriteriaPerRecopilation } from 'src/core/criteria-per-recopilations/entities/criteria-per-recopilation.entity'

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

  @OneToMany(
    () => IndicatorPerRecopilation,
    (indicatorsPerRecopilations) => indicatorsPerRecopilations.indicator
  )
  indicatorsPerRecopilations: IndicatorPerRecopilation[]

  @OneToMany(
    () => CategoryPerRecopilation,
    (categoriesPerRecopilations) => categoriesPerRecopilations.category
  )
  categoriesPerRecopilations: CategoryPerRecopilation[]

  @OneToMany(
    () => CriteriaPerRecopilation,
    (criteriaPerRecopilation) => criteriaPerRecopilation.recopilation
  )
  criteriaPerRecopilations: CriteriaPerRecopilation[]

  //TODO: RELATIONS
}
