import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch
} from '@nestjs/common'
import { CategoriesPerRecopilationsService } from '../categories-per-recopilations/categories-per-recopilations.service'
import { CreateCategoryPerRecopilationDto } from './dto/create-category-per-recopilation.dto'
import { UpdateCategoryPerRecopilationDto } from './dto/update-category-per-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-by-categories-per-recopilations-by-param.dto'

@ApiTags('Categories Per Recopilations')
@Controller('categories-per-recopilations')
export class CategoriesPerRecopilationsController {
  constructor(
    private readonly categoriesPerRecopilationsService: CategoriesPerRecopilationsService
  ) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { categoriesPerRecopilation, count } =
      await this.categoriesPerRecopilationsService.findAll({
        page,
        itemsPerPage,
        orderBy,
        orderType,
        filters
      })

    return constructPaginatedItemsDto(
      categoriesPerRecopilation,
      count,
      page,
      itemsPerPage
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoriesPerRecopilationsService.findOne(id)
  }

  @Post()
  async create(
    @Body()
    createCategoriesPerRecopilationsDto: CreateCategoryPerRecopilationDto
  ) {
    return this.categoriesPerRecopilationsService.create(
      createCategoriesPerRecopilationsDto
    )
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateIndicatorsPerRecopilationsDto: UpdateCategoryPerRecopilationDto
  ) {
    return this.categoriesPerRecopilationsService.update(
      id,
      updateIndicatorsPerRecopilationsDto
    )
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.categoriesPerRecopilationsService.remove(id)
  }
}
