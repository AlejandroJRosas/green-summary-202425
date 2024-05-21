import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecommendService } from './recommends.service'
import { RecommendController } from './recommends.controller'
import { Recommendation } from './entities/recommendation.entity'
import { Category } from '../categories/entities/category.entity'
import { Department } from '../users/entities/department.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation, Department, Category])],
  providers: [RecommendService],
  controllers: [RecommendController]
})
export class RecommendModule {}
