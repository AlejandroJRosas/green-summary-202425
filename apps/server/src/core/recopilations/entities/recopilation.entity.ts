import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { IndicatorPerRecopilation } from 'src/core/indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
import { CategoryPerRecopilation } from 'src/core/categories-per-recopilations/entities/category-per-recopilation.entity'
import { CriteriaPerRecopilation } from 'src/core/criterion-per-recopilations/entities/criteria-per-recopilation.entity'
import { Answer } from 'src/core/answers/entities/answer.entity'
import { CategorizedCriteria } from 'src/core/categorized-criteria/entities/categorized-criterion.entity'
import { DepartmentPerRecopilation } from 'src/core/departments-per-recopilations/entities/departments-per-recopilation.entity'

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
    (indicatorsPerRecopilations) => indicatorsPerRecopilations.recopilation
  )
  indicatorsPerRecopilations: IndicatorPerRecopilation[]

  @OneToMany(
    () => CategoryPerRecopilation,
    (categoriesPerRecopilations) => categoriesPerRecopilations.recopilation
  )
  categories: CategoryPerRecopilation[]

  @OneToMany(
    () => CriteriaPerRecopilation,
    (criteriaPerRecopilation) => criteriaPerRecopilation.recopilation
  )
  criterionPerRecopilation: CriteriaPerRecopilation[]

  @OneToMany(
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.recopilation
  )
  categorizedCriterion: CategorizedCriteria[]

  @OneToMany(() => Answer, (answers) => answers.recopilation)
  answers: Answer[]

  @OneToMany(
    () => DepartmentPerRecopilation,
    (departmentsPerRecopilation) => departmentsPerRecopilation.recopilation
  )
  departmentsPerRecopilation: DepartmentPerRecopilation[]
}
