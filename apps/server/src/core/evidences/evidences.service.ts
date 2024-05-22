import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Evidence } from './entities/evidence.entity'
import { CreateEvidenceDto } from './dto/create-evidence.dto'
import { UpdateEvidenceDto } from './dto/update-evidence.dto'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@Injectable()
export class EvidencesService {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @InjectRepository(InformationCollection)
    private readonly informationCollectionRepository: Repository<InformationCollection>
  ) {}

  async findAll({
    page,
    itemsPerPage
  }: PaginationParams): Promise<{ evidences: Evidence[]; count: number }> {
    const [evidences, count] = await this.evidenceRepository.findAndCount({
      relations: ['collection'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage
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
    const coleccion =
      await this.informationCollectionRepository.findOneByOrFail({
        id: createEvidenceDto.collectionId
      })

    if (!coleccion) {
      throw new NotFoundException('Collection not found')
    }

    const evidence = this.evidenceRepository.create({
      ...createEvidenceDto,
      collection: coleccion
    })

    return this.evidenceRepository.save(evidence)
  }

  async update(
    id: number,
    updateEvidenceDto: UpdateEvidenceDto
  ): Promise<Evidence> {
    await this.evidenceRepository.update(id, updateEvidenceDto)
    return this.evidenceRepository.findOneByOrFail({ id })
  }

  async remove(id: number): Promise<void> {
    await this.evidenceRepository.delete(id)
  }
}
