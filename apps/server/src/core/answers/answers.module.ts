import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnswersService } from './answers.service'
import { AnswersController } from './answers.controller'
import { Answer } from './entities/answer.entity'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Department } from '../users/entities/department.entity'
import { Category } from 'src/core/categories/entities/category.entity'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer,
      Recopilation,
      Department,
      Category,
      InformationCollection
    ])
  ],
  providers: [AnswersService],
  controllers: [AnswersController]
})
export class AnswersModule {}
