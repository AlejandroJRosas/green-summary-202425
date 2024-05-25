import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { IndicatorsPerRecopilations } from 'src/core/indicators_per_recopilations/entities/indicators_per_recopilation.entity'
import { CategoriesPerRecopilation } from 'src/core/categories_per_recopilations/entities/categories_per_recopilation.entity'
import { CriteriaPerRecopilation } from 'src/core/criteria_per_recopilations/entities/criteria_per_recopilation.entity'

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
    () => IndicatorsPerRecopilations,
    (indicatorsPerRecopilations) => indicatorsPerRecopilations.indicator
  )
  indicatorsPerRecopilations: IndicatorsPerRecopilations[]

  @OneToMany(
    () => CategoriesPerRecopilation,
    (categoriesPerRecopilations) => categoriesPerRecopilations.category
  )
  categoriesPerRecopilations: CategoriesPerRecopilation[]

  @OneToMany(
    () => CriteriaPerRecopilation,
    (criteriaPerRecopilation) => criteriaPerRecopilation.recopilation
  )
  criteriaPerRecopilations: CriteriaPerRecopilation[]

  //TODO: RELATIONS
}
