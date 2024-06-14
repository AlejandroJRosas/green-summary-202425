import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DepartmentsService } from './departments.service'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { OrderByParamDto } from './dto/order-users-by-param.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { departments, count } = await this.departmentsService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    return constructPaginatedItemsDto(departments, count, page, itemsPerPage)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id)
  }

  @Get('/recopilation/:recopilationId')
  async getDepartmentsByRecopilationId(
    @Param('recopilationId') recopilationId: string
  ) {
    return this.departmentsService.departmentsByRecopilation(+recopilationId)
  }
}
