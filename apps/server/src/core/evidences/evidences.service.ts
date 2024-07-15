import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Evidence } from './entities/evidence.entity'
import { Document } from './entities/document.entity'
import { Image } from './entities/image.entity'
import { Link } from './entities/link.entity'
import { EvidenceType } from './evidences.constants'
import { CreateEvidenceDto } from './dto/create-evidence.dto'
import { UpdateEvidenceDto } from './dto/update-evidence.dto'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-evidences-by-param.dto'
import { NotificationsService } from '../notifications/notifications.service'

@Injectable()
export class EvidencesService {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    @InjectRepository(InformationCollection)
    private readonly informationCollectionRepository: Repository<InformationCollection>,
    private notificationsService: NotificationsService
  ) {}

  async findAll({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [evidences, count] = await this.evidenceRepository.findAndCount({
      relations: ['collection'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters)
    })

    return { evidences, count }
  }

  async findOne(id: number): Promise<Evidence> {
    return this.evidenceRepository.findOne({
      where: { id },
      relations: ['collection']
    })
  }

  async create(createEvidenceDto: CreateEvidenceDto): Promise<Evidence> {
    const collection = await this.informationCollectionRepository.findOneOrFail(
      {
        where: { id: createEvidenceDto.collectionId },
        relations: ['recopilation', 'department', 'category']
      }
    )

    if (!collection) {
      throw new NotFoundException('Collection not found')
    }

    if (createEvidenceDto.error === '') {
      createEvidenceDto.error = null
    }
    if (createEvidenceDto.externalLink === '') {
      createEvidenceDto.externalLink = null
    }

    const { type } = createEvidenceDto
    switch (type) {
      case EvidenceType.DOCUMENT:
        if (!createEvidenceDto.fileLink.match(/\.(xls|xlsx|doc|docx|pdf)$/)) {
          throw new Error('Invalid format type')
        }
        break

      case EvidenceType.IMAGE:
        if (
          !createEvidenceDto.fileLink.match(/\.(jpeg|jpg|webp|avif|png|svg)$/)
        ) {
          throw new Error('Invalid format type')
        }
        break
    }
    let evidence: Evidence

    const descriptionNotification = `El departamento ${collection.department.id} ha agregado una evidencia en la colección de información ${collection.id} de la recopilación ${collection.recopilation.id} asociada a la categoría ${collection.category.id}`
    await this.notificationsService.createAll(descriptionNotification)

    switch (type) {
      case EvidenceType.DOCUMENT:
        evidence = this.documentRepository.create({
          ...createEvidenceDto,
          collection
        })
        return this.documentRepository.save(evidence)
      case EvidenceType.IMAGE:
        evidence = this.imageRepository.create({
          ...createEvidenceDto,
          collection
        })
        return this.imageRepository.save(evidence)
      case EvidenceType.LINK:
        evidence = this.linkRepository.create({
          ...createEvidenceDto,
          collection
        })
        return this.linkRepository.save(evidence)
    }
  }

  async update(
    id: number,
    updateEvidenceDto: UpdateEvidenceDto
  ): Promise<Evidence> {
    await this.evidenceRepository.update(id, updateEvidenceDto)

    const collection = await this.informationCollectionRepository.findOneOrFail(
      {
        where: { id: updateEvidenceDto.collectionId },
        relations: ['recopilation', 'department', 'category']
      }
    )

    if (
      updateEvidenceDto.error === null ||
      updateEvidenceDto.error === '' ||
      updateEvidenceDto.error === undefined
    ) {
      const descriptionNotification = `El departamento ${collection.department.id} ha editado una evidencia en la colección de información ${collection.id} de la recopilación ${collection.recopilation.id} asociada a la categoría ${collection.category.id}`
      await this.notificationsService.createAll(descriptionNotification)
    } else {
      const notification = {
        userId: collection.department.id,
        description: `Tienes un error en la evidencia ${id} de la colección de información ${collection.id} de la recopilación ${collection.recopilation.id} asociada a la categoría ${collection.category.id}`
      }
      await this.notificationsService.create(notification)
    }

    return this.evidenceRepository.findOneByOrFail({ id })
  }

  async remove(id: number): Promise<void> {
    await this.evidenceRepository.delete(id)
  }
}
