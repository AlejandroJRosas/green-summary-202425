import { Module } from '@nestjs/common'
import { CriteriaPerRecopilationsService } from './criteria_per_recopilations.service'
import { CriteriaPerRecopilationsController } from './criteria_per_recopilations.controller'
import { CriteriaPerRecopilation } from './entities/criteria_per_recopilation.entity'
import { Criterion } from '../criteria/entities/criterion.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CriteriaPerRecopilation, Criterion, Recopilation])
  ],
  controllers: [CriteriaPerRecopilationsController],
  providers: [CriteriaPerRecopilationsService]
})
export class CriteriaPerRecopilationsModule {}
