import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InformationCollection } from './entities/information-collection.entity'
import { CreateInformationCollectionDto } from './dto/create-information-collection.dto'
import { UpdateInformationCollectionDto } from './dto/update-information-collection.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@Injectable()
export class InformationCollectionsService {
  constructor(
    @InjectRepository(InformationCollection)
    private informationCollectionsRepository: Repository<InformationCollection>
  ) {}

  async findAll({
    page,
    itemsPerPage
  }: PaginationParams): Promise<{
    informationCollection: InformationCollection[]
    count: number
  }> {
    const [informationCollection, count] =
      await this.informationCollectionsRepository.findAndCount({
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage
      })

    return { informationCollection, count }
  }

  async findOne(id: number): Promise<InformationCollection> {
    return await this.informationCollectionsRepository.findOneByOrFail({ id })
  }

  async create(
    createInformationCollectionDto: CreateInformationCollectionDto
  ): Promise<InformationCollection> {
    const informationCollection =
      await this.informationCollectionsRepository.create(
        createInformationCollectionDto
      )
    return await this.informationCollectionsRepository.save(
      informationCollection
    )
  }

  async update(
    id: number,
    updateInformationCollectionDto: UpdateInformationCollectionDto
  ): Promise<InformationCollection> {
    await this.informationCollectionsRepository.update(
      id,
      updateInformationCollectionDto
    )
    return this.informationCollectionsRepository.findOneByOrFail({ id })
  }

  async remove(id: number): Promise<void> {
    await this.informationCollectionsRepository.delete(id)
  }
}
