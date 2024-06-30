import { Module } from '@nestjs/common'
import { SummaryInformationService } from './summary-information.service'
import { SummaryInformationController } from './summary-information.controller'

@Module({
  controllers: [SummaryInformationController],
  providers: [SummaryInformationService]
})
export class SummaryInformationModule {}
