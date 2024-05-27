import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'

@Entity('criterion_per_recopilations')
export class CriteriaPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.criteriaPerRecopilations
  )
  @JoinColumn({ name: 'recopilation_id' })
  recopilation: Recopilation

  @ManyToOne(() => Criteria, (criterion) => criterion.criteriaPerRecopilations)
  @JoinColumn({
    name: 'indicatorIndex',
    referencedColumnName: 'indicatorIndex'
  })
  @JoinColumn({ name: 'subIndex', referencedColumnName: 'subIndex' })
  criterion: Criteria
}
