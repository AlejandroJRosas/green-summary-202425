import { ChildEntity, OneToMany } from 'typeorm'
import { User } from './user.entity'
import { UserTypes } from '../constants'
import { Recommendation } from 'src/core/recommendations/entities/recommendation.entity'
import { UserTypes } from '../constants'

@ChildEntity(UserTypes.DEPARTMENT)
export class Department extends User {
  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.department
  )
  recommendations: Recommendation[]

  //TODO: RELATIONS WITH OTHER ENTITIES
}
