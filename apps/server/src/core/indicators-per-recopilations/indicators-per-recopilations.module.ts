import { Module } from '@nestjs/common'
import { IndicatorsPerRecopilationsService } from './indicators-per-recopilations.service'
import { IndicatorsPerRecopilationsController } from './indicators-per-recopilations.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { IndicatorPerRecopilation } from './entities/indicator-per-recopilatio.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IndicatorPerRecopilation,
      Indicator,
      Recopilation
    ])
  ],
  controllers: [IndicatorsPerRecopilationsController],
  providers: [IndicatorsPerRecopilationsService]
})
export class IndicatorsPerRecopilationsModule {}
