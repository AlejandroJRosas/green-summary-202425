import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecommendationsService } from './recommendations.service'
import { RecommendationsController } from './recommendations.controller'
import { Recommendation } from './entities/recommendation.entity'
import { Category } from '../categories/entities/category.entity'
import { Department } from '../users/entities/department.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'
import { NotificationsService } from '../notifications/notifications.service'
import { Notification } from '../notifications/entities/notification.entity'
import { User } from '../users/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recommendation,
      Department,
      Category,
      Recopilation,
      DepartmentPerRecopilation,
      Notification,
      User
    ])
  ],
  providers: [RecommendationsService, NotificationsService],
  controllers: [RecommendationsController]
})
export class RecommendationsModule {}
