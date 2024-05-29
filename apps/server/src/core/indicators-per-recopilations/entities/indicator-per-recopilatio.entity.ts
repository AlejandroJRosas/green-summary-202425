import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'

@Entity('indicators_per_recopilations')
export class IndicatorPerRecopilation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Recopilation,
    (recopilation) => recopilation.indicatorsPerRecopilations
  )
  recopilation: Recopilation

  @ManyToOne(
    () => Indicator,
    (indicator) => indicator.recopilationsPerIndicator
  )
  indicator: Indicator
}
