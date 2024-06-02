import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InformationCollection } from './entities/information-collection.entity'
import { CreateInformationCollectionDto } from './dto/create-information-collection.dto'
import { UpdateInformationCollectionDto } from './dto/update-information-collection.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-information-collections-by-param.dto'

@Injectable()
export class InformationCollectionsService {
  constructor(
    @InjectRepository(InformationCollection)
    private informationCollectionsRepository: Repository<InformationCollection>
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
    const [informationCollection, count] =
      await this.informationCollectionsRepository.findAndCount({
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
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
