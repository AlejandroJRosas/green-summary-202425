import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { IndicatorPerRecopilation } from 'src/core/indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
import { CategorizedCriteria } from 'src/core/categorized-criteria/entities/categorized-criterion.entity'
import { DepartmentPerRecopilation } from 'src/core/departments-per-recopilations/entities/departments-per-recopilation.entity'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'

@Entity('recopilations')
export class Recopilation {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string

  @Column({ type: 'text', nullable: false })
  description: string

  @Column({ type: 'date', nullable: false })
  startDate: Date

  @Column({ type: 'date', nullable: false })
  departmentEndDate: Date

  @Column({ type: 'date', nullable: false })
  endDate: Date

  @Column({ default: false })
  isReady: boolean

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
