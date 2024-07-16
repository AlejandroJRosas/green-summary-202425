import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  Index
} from 'typeorm'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { CategorizedCriteria } from 'src/core/categorized-criteria/entities/categorized-criterion.entity'

@Entity('criterion')
@Index(['subIndex', 'indicator'], {
  unique: true,
  where: '"deletedAt" IS NULL'
})
@Index(['name', 'indicator'], {
  unique: true,
  where: '"deletedAt" IS NULL'
})
export class Criteria {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  subIndex: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  alias: string

  @Column({ type: 'text', nullable: false })
  helpText: string

  @Column({ type: 'boolean', default: false })
  requiresEvidence: boolean

  @ManyToOne(() => Indicator, (indicator) => indicator.criterion, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: ['soft-remove']
  })
  indicator: Indicator

  @OneToMany(
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.criteria
  )
  categorizedCriterion: CategorizedCriteria[]

  @DeleteDateColumn()
  deletedAt: Date
}
