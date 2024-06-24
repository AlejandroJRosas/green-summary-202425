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
    private readonly informationCollectionRepository: Repository<InformationCollection>
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
    try {
      return await this.evidenceRepository.findOneOrFail({
        where: { id },
        relations: ['collection']
      })
    } catch (error) {
      throw new NotFoundException(`No se encontró la evidencia con ID ${id}.`)
    }
  }

  async create(createEvidenceDto: CreateEvidenceDto): Promise<Evidence> {
    const collection = await this.informationCollectionRepository
      .findOneByOrFail({
        id: createEvidenceDto.collectionId
      })
      .catch(() => {
        throw new NotFoundException(
          `No se encontró la colección de información con ID ${createEvidenceDto.collectionId}.`
        )
      })

    const { type } = createEvidenceDto
    let evidence: Evidence

    switch (type) {
      case EvidenceType.DOCUMENT:
        evidence = this.documentRepository.create({
          ...createEvidenceDto,
          collection: coleccion
        })
        return this.documentRepository.save(evidence)
      case EvidenceType.IMAGE:
        evidence = this.imageRepository.create({
          ...createEvidenceDto,
          collection: coleccion
        })
        return this.imageRepository.save(evidence)
      case EvidenceType.LINK:
        evidence = this.linkRepository.create({
          ...createEvidenceDto,
          collection: coleccion
        })
        return this.linkRepository.save(evidence)
    }
  }

  async update(
    id: number,
    updateEvidenceDto: UpdateEvidenceDto
  ): Promise<Evidence> {
    await this.evidenceRepository.update(id, updateEvidenceDto)
    try {
      return await this.evidenceRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`No se encontró la evidencia con ID ${id}.`)
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.evidenceRepository.findOneByOrFail({ id })
      await this.evidenceRepository.delete(id)
    } catch (error) {
      throw new NotFoundException(
        `No se encontró la evidencia con ID ${id} para eliminar.`
      )
    }
  }
}
