import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { IndicatorPerRecopilation } from 'src/core/indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
import { CategorizedCriteria } from 'src/core/categorized-criteria/entities/categorized-criterion.entity'
import { DepartmentPerRecopilation } from 'src/core/departments-per-recopilations/entities/departments-per-recopilation.entity'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'

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
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.recopilation
  )
  categorizedCriterion: CategorizedCriteria[]

  @OneToMany(
    () => InformationCollection,
    (informationCollection) => informationCollection.recopilation
  )
  informationCollections: InformationCollection[]

  @OneToMany(
    () => DepartmentPerRecopilation,
    (departmentsPerRecopilation) => departmentsPerRecopilation.recopilation
  )
  departmentsPerRecopilation: DepartmentPerRecopilation[]
}
