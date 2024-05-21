import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecommendService } from './recommends.service'
import { RecommendController } from './recommends.controller'
import { Recommend } from './entities/recommend.entity'
import { User } from '../users/entities/user.entity'
import { Category } from '../categories/entities/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Recommend, User, Category])],
  providers: [RecommendService],
  controllers: [RecommendController]
})
export class RecommendModule {}
