import { CategorizedCriteria } from 'src/core/categorized-criteria/entities/categorized-criterion.entity'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { InformationCollection } from 'src/core/information-collections/entities/information-collection.entity'
import { Recommendation } from 'src/core/recommendations/entities/recommendation.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  OneToMany,
  DeleteDateColumn
} from 'typeorm'
import { VALUES } from 'shared/validations'

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: VALUES.categoryNameMaxAmount,
    nullable: false
  })
  name: string

  @Column({ type: 'text', nullable: false })
  helpText: string

  @ManyToOne(() => Indicator, (indicator) => indicator.categories, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: ['soft-remove']
  })
  indicator: Indicator

  @OneToMany(() => Recommendation, (recommendation) => recommendation.category)
  recommendations: Recommendation[]

  @OneToMany(
    () => InformationCollection,
    (informationCollection) => informationCollection.category
  )
  informationCollections: InformationCollection[]

  @OneToMany(
    () => CategorizedCriteria,
    (categorizedCriteria) => categorizedCriteria.category
  )
  categorizedCriterion: CategorizedCriteria[]

  @DeleteDateColumn()
  deletedAt: Date
}
