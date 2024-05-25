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
import { CategorizedCriteriaService } from './categorized_criteria.service'
import { CreateCategorizedCriteriaDto } from './dto/create-categorized_criterion.dto'
import { UpdateCategorizedCriterionDto } from './dto/update-categorized_criterion.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Categorized Criteria')
@Controller('categorized-criteria')
export class CategorizedCriteriaController {
  constructor(
    private readonly categorizedCriteriaService: CategorizedCriteriaService
  ) {}

  @Get()
  async findAll(@Query() { page = 1, itemsPerPage = 10 }: PaginationParams) {
    const { categorizedCriteria, count } =
      await this.categorizedCriteriaService.findAll({ page, itemsPerPage })

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
