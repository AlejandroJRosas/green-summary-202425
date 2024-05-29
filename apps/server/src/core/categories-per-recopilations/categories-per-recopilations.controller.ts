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
import { CategoriesPerRecopilationsService } from '../categories-per-recopilations/categories-per-recopilations.service'
import { CreateCategoryPerRecopilationDto } from './dto/create-category-per-recopilation.dto'
import { UpdateCategoryPerRecopilationDto } from './dto/update-category-per-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Categories Per Recopilations')
@Controller('categories-per-recopilations')
export class CategoriesPerRecopilationsController {
  constructor(
    private readonly categoriesPerRecopilationsService: CategoriesPerRecopilationsService
  ) {}

  @Get()
  async findAll(@Query() { page = 1, itemsPerPage = 10 }: PaginationParams) {
    const { categoriesPerRecopilation, count } =
      await this.categoriesPerRecopilationsService.findAll({
        page,
        itemsPerPage
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

  @Put(':id')
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
