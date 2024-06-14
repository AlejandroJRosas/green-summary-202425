import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecommendationsService } from './recommendations.service'
import { RecommendationsController } from './recommendations.controller'
import { Recommendation } from './entities/recommendation.entity'
import { Category } from '../categories/entities/category.entity'
import { Department } from '../users/entities/department.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recommendation,
      Department,
      Category,
      Recopilation,
      DepartmentPerRecopilation
    ])
  ],
  providers: [RecommendationsService],
  controllers: [RecommendationsController]
})
export class RecommendationsModule {}
