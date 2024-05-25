import { Module } from '@nestjs/common'
import { IndicatorsPerRecopilationsService } from './indicators_per_recopilations.service'
import { IndicatorsPerRecopilationsController } from './indicators_per_recopilations.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { IndicatorsPerRecopilations } from './entities/indicators_per_recopilation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IndicatorsPerRecopilations,
      Indicator,
      Recopilation
    ])
  ],
  controllers: [IndicatorsPerRecopilationsController],
  providers: [IndicatorsPerRecopilationsService]
})
export class IndicatorsPerRecopilationsModule {}
