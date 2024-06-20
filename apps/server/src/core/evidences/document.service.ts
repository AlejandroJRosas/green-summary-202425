import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { OrderByParamDto } from './dto/order-evidences-by-param.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { Document } from './entities/document.entity'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>
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
    const [documents, count] = await this.documentsRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters),
      select: ['id', 'fileLink', 'description', 'type']
    })

    return { documents, count }
  }

  async findOne(id: number) {
    const document = await this.documentsRepository.findOneOrFail({
      where: { id },
      select: ['id', 'fileLink', 'description', 'type']
    })

    return document
  }
}
