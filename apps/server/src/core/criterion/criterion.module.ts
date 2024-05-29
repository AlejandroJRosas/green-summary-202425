import { Module } from '@nestjs/common'
import { CriterionService } from './criterion.service'
import { CriterionController } from './criterion.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Criteria } from './entities/criteria.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Criteria, Indicator])],
  controllers: [CriterionController],
  providers: [CriterionService],
  exports: [TypeOrmModule]
})
export class CriterionModule {}
