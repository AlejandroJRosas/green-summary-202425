import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'

@Entity('criterion_per_recopilations')
export class CriteriaPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.criterionPerRecopilation
  )
  recopilation: Recopilation

  @ManyToOne(() => Criteria, (criterion) => criterion.recopilationsPerCriteria)
  criterion: Criteria
}
