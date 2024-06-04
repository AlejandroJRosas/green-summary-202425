import { Module } from '@nestjs/common'
import { RecopilationsService } from './recopilations.service'
import { RecopilationsController } from './recopilations.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recopilation } from './entities/recopilation.entity'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { Category } from '../categories/entities/category.entity'
import { IndicatorPerRecopilation } from '../indicators-per-recopilations/entities/indicator-per-recopilatio.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recopilation,
      Indicator,
      Category,
      Criteria,
      IndicatorPerRecopilation
    ])
  ],
  controllers: [RecopilationsController],
  providers: [RecopilationsService],
  exports: [TypeOrmModule]
})
export class RecopilationsModule {}
