import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DocumentsService } from './document.service'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { OrderByParamDto } from './dto/order-evidences-by-param.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { documents, count } = await this.documentsService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    return constructPaginatedItemsDto(documents, count, page, itemsPerPage)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id)
  }
}
