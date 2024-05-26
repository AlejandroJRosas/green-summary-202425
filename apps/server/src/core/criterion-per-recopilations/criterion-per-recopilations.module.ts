import { Module } from '@nestjs/common'
import { CriteriaPerRecopilationsService } from './criterion-per-recopilations.service'
import { CriteriaPerRecopilationsController } from './criterion-per-recopilations.controller'
import { CriteriaPerRecopilation } from './entities/criteria-per-recopilation.entity'
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
