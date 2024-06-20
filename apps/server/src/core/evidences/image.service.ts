import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { OrderByParamDto } from './dto/order-evidences-by-param.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { Image } from './entities/image.entity'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>
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
    const [images, count] = await this.imagesRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters),
      select: ['id', 'fileLink', 'description', 'type']
    })

    return { images, count }
  }

  async findOne(id: number) {
    const image = await this.imagesRepository.findOneOrFail({
      where: { id },
      select: ['id', 'fileLink', 'description', 'type']
    })

    return image
  }
}
