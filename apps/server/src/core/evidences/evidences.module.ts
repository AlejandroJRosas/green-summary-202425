import { Module } from '@nestjs/common'
import { EvidencesService } from './evidences.service'
import { EvidencesController } from './evidences.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Evidence } from './entities/evidence.entity'
import { Document } from './entities/document.entity'
import { Image } from './entities/image.entity'
import { Link } from './entities/link.entity'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'
import { DocumentsController } from './document.controller'
import { ImagesController } from './image.controller'
import { DocumentsService } from './document.service'
import { ImagesService } from './image.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Evidence,
      Document,
      Image,
      Link,
      InformationCollection
    ])
  ],
  controllers: [EvidencesController, DocumentsController, ImagesController],
  providers: [EvidencesService, DocumentsService, ImagesService]
})
export class EvidencesModule {}
