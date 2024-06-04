import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ApiTags } from '@nestjs/swagger'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-categories-by-param.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'

@ApiTags('Categories')
@Controller('categories')
@Roles(Role.Coordinator, Role.Admin)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { categories, count } = await this.categoriesService.getAllCategories(
      {
        page,
        itemsPerPage,
        orderBy,
        orderType,
        filters
      }
    )

    const paginatedItems = constructPaginatedItemsDto(
      categories,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    const category = await this.categoriesService.getOneCategory(Number(id))
    return category
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() newCategory: CreateCategoryDto) {
    const createdCategory = await this.categoriesService.create(newCategory)
    return createdCategory
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updatedCategory: UpdateCategoryDto
  ) {
    const category = await this.categoriesService.updateCategory(
      Number(id),
      updatedCategory
    )
    return category
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param('id') id: string) {
    await this.categoriesService.deleteCategory(Number(id))
  }

  @Get('/indicator/:indicatorIndex')
  async getCategoriesByIndicator(
    @Param('indicatorIndex') indicatorIndex: string
  ) {
    const categories = await this.categoriesService.categoriesByIndicator(
      Number(indicatorIndex)
    )
    return categories
  }
}
