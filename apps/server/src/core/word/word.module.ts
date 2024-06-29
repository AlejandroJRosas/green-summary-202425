import { Module } from '@nestjs/common'
import { WordService } from './word.service'
import { WordController } from './word.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'
import { CategorizedCriteria } from '../categorized-criteria/entities/categorized-criterion.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InformationCollection,
      CategorizedCriteria,
      Criteria,
      Recopilation
    ])
  ],
  controllers: [WordController],
  providers: [WordService]
})
export class WordModule {}
