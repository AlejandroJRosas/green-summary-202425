import { Module } from '@nestjs/common'
import { RecopilationsService } from './recopilations.service'
import { RecopilationsController } from './recopilations.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recopilation } from './entities/recopilation.entity'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { Category } from '../categories/entities/category.entity'
import { IndicatorPerRecopilation } from '../indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
import { CategorizedCriteria } from '../categorized-criteria/entities/categorized-criterion.entity'
import { Recommendation } from '../recommendations/entities/recommendation.entity'
import { Department } from '../users/entities/department.entity'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recopilation,
      Indicator,
      Category,
      Criteria,
      Department,
      IndicatorPerRecopilation,
      CategorizedCriteria,
      Recommendation,
      DepartmentPerRecopilation,
      InformationCollection
    ])
  ],
  controllers: [RecopilationsController],
  providers: [RecopilationsService],
  exports: [TypeOrmModule]
})
export class RecopilationsModule {}
