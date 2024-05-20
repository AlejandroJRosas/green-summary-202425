import { Module } from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { IndicatorsController } from './indicators.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Indicator } from './entities/indicator.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Indicator])],
  controllers: [IndicatorsController],
  providers: [IndicatorsService]
})
export class IndicatorsModule {}
