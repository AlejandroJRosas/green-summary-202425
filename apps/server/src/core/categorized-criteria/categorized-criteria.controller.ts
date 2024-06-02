import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query
} from '@nestjs/common'
import { CategorizedCriteriaService } from './categorized-criteria.service'
import { CreateCategorizedCriteriaDto } from './dto/create-categorized-criterion.dto'
import { UpdateCategorizedCriterionDto } from './dto/update-categorized-criterion.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-categorized-criteria-by-param.dto'

@ApiTags('Categorized Criteria')
@Controller('categorized-criteria')
export class CategorizedCriteriaController {
  constructor(
    private readonly categorizedCriteriaService: CategorizedCriteriaService
  ) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { categorizedCriteria, count } =
      await this.categorizedCriteriaService.findAll({
        page,
        itemsPerPage,
        orderBy,
        orderType,
        filters
      })

    return constructPaginatedItemsDto(
      categorizedCriteria,
      count,
      page,
      itemsPerPage
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categorizedCriteriaService.findOne(id)
  }

  @Post()
  async create(
    @Body() createCategorizedCriteriaDto: CreateCategorizedCriteriaDto
  ) {
    return this.categorizedCriteriaService.create(createCategorizedCriteriaDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategorizedCriteriaDto: UpdateCategorizedCriterionDto
  ) {
    return this.categorizedCriteriaService.update(
      id,
      updateCategorizedCriteriaDto
    )
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categorizedCriteriaService.remove(id)
  }
}
