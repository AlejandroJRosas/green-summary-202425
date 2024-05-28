import { ChildEntity, OneToMany } from 'typeorm'
import { User } from './user.entity'
import { USER_TYPES } from '../constants'
import { Recommendation } from 'src/core/recommendations/entities/recommendation.entity'

@ChildEntity(USER_TYPES.DEPARTMENT)
export class Department extends User {
  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.department
  )
  recommendations: Recommendation[]

  //TODO: RELATIONS WITH OTHER ENTITIES
}
