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
import { CategoriesPerRecopilationsService } from '../categories_per_recopilations/categories_per_recopilations.service'
import { CreateCategoriesPerRecopilationDto } from '../categories_per_recopilations/dto/create-categories_per_recopilation.dto'
import { UpdateCategoriesPerRecopilationDto } from '../categories_per_recopilations/dto/update-categories_per_recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Categories_Per_Recopilations')
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
    createCategoriesPerRecopilationsDto: CreateCategoriesPerRecopilationDto
  ) {
    return this.categoriesPerRecopilationsService.create(
      createCategoriesPerRecopilationsDto
    )
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateIndicatorsPerRecopilationsDto: UpdateCategoriesPerRecopilationDto
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
