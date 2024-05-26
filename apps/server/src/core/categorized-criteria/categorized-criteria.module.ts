import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategorizedCriteria } from './entities/categorized-criterion.entity'
import { CategorizedCriteriaService } from './categorized-criteria.service'
import { CategorizedCriteriaController } from './categorized-criteria.controller'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Criterion } from '../criteria/entities/criterion.entity'
import { Category } from '../categories/entities/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategorizedCriteria,
      Recopilation,
      Criterion,
      Category
    ])
  ],
  controllers: [CategorizedCriteriaController],
  providers: [CategorizedCriteriaService]
})
export class CategorizedCriteriaModule {}
