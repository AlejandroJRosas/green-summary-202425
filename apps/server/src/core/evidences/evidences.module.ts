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
import { LinksController } from './link.controller'
import { LinksService } from './link.service'
import { NotificationsService } from '../notifications/notifications.service'
import { Notification } from '../notifications/entities/notification.entity'
import { User } from '../users/entities/user.entity'
import { MailsService } from '../mails/mails.service'
import { InformationCollectionsService } from '../information-collections/information-collections.service'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Department } from '../users/entities/department.entity'
import { Category } from '../categories/entities/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Evidence,
      Document,
      Image,
      Link,
      InformationCollection,
      Notification,
      User,
      Recopilation,
      Department,
      Category
    ])
  ],
  controllers: [
    EvidencesController,
    DocumentsController,
    ImagesController,
    LinksController
  ],
  providers: [
    EvidencesService,
    DocumentsService,
    ImagesService,
    LinksService,
    NotificationsService,
    MailsService,
    InformationCollectionsService
  ]
})
export class EvidencesModule {}
