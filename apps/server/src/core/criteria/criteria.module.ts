import { Module } from '@nestjs/common'
import { CriterionService } from './criteria.service'
import { CriterionController } from './criteria.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Criterion } from './entities/criterion.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Criterion, Indicator])],
  controllers: [CriterionController],
  providers: [CriterionService],
  exports: [TypeOrmModule]
})
export class CriteriaModule {}
