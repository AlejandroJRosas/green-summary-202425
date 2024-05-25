import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Criterion } from 'src/core/criteria/entities/criterion.entity'

@Entity('criteria_per_recopilations')
export class CriteriaPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.criteriaPerRecopilations
  )
  @JoinColumn({ name: 'recopilation_id' })
  recopilation: Recopilation

  @ManyToOne(() => Criterion, (criterion) => criterion.criteriaPerRecopilations)
  @JoinColumn({
    name: 'indicatorIndex',
    referencedColumnName: 'indicatorIndex'
  })
  @JoinColumn({ name: 'subIndex', referencedColumnName: 'subIndex' })
  criterion: Criterion
}
