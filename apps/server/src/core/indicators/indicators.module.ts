import { Module } from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { IndicatorsController } from './indicators.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Indicator } from './entities/indicator.entity'
import { IndicatorPerRecopilation } from '../indicators-per-recopilations/entities/indicator-per-recopilatio.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Indicator, IndicatorPerRecopilation])],
  controllers: [IndicatorsController],
  providers: [IndicatorsService],
  exports: [TypeOrmModule]
})
export class IndicatorsModule {}
