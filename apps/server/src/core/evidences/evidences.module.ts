import { Module } from '@nestjs/common'
import { EvidencesService } from './evidences.service'
import { EvidencesController } from './evidences.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Evidence } from './entities/evidence.entity'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Evidence, InformationCollection])],
  controllers: [EvidencesController],
  providers: [EvidencesService]
})
export class EvidencesModule {}
