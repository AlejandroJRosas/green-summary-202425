import { Module } from '@nestjs/common'
import { InformationCollectionsService } from './information-collections.service'
import { InformationCollectionsController } from './information-collections.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InformationCollection } from './entities/information-collection.entity'

@Module({
  imports: [TypeOrmModule.forFeature([InformationCollection])],
  controllers: [InformationCollectionsController],
  providers: [InformationCollectionsService]
})
export class InformationCollectionsModule {}
