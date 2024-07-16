import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'

@Entity('indicators_per_recopilations')
@Unique(['recopilation', 'indicator'])
export class IndicatorPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.indicatorsPerRecopilations,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  recopilation: Recopilation

  @ManyToOne(
    () => Indicator,
    (indicator) => indicator.recopilationsPerIndicator,
    {
      onUpdate: 'CASCADE'
    }
  )
  indicator: Indicator
}
