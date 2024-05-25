import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'

@Entity('indicators_per_recopilations')
export class IndicatorsPerRecopilations {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Recopilation, { eager: true })
  @JoinColumn({ name: 'IDRecopilacion' })
  recopilation: Recopilation

  @ManyToOne(() => Indicator, { eager: true })
  @JoinColumn({ name: 'IndiceIndicador' })
  indicator: Indicator
}
