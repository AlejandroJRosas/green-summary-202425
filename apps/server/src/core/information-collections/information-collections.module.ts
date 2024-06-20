import { Module } from '@nestjs/common'
import { InformationCollectionsService } from './information-collections.service'
import { InformationCollectionsController } from './information-collections.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InformationCollection } from './entities/information-collection.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Department } from '../users/entities/department.entity'
import { Category } from '../categories/entities/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InformationCollection,
      Recopilation,
      Department,
      Category
    ])
  ],
  controllers: [InformationCollectionsController],
  providers: [InformationCollectionsService]
})
export class InformationCollectionsModule {}
