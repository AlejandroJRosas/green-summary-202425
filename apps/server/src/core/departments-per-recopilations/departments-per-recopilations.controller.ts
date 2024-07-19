import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  Put
} from '@nestjs/common'
import { DepartmentsPerRecopilationsService } from './departments-per-recopilations.service'
import { CreateDepartmentsPerRecopilationDto } from './dto/create-department-per-recopilation.dto'
import { UpdateDepartmentPerRecopilationDto } from './dto/update-department-per-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-departments-per-recopilations-by-param.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { MatrixChangedEvent } from '../recopilations/dto/matrix-changed.event'

@ApiTags('Departments Per Recopilations')
@Controller('departments-per-recopilations')
@Roles(Role.Coordinator, Role.Admin)
export class DepartmentsPerRecopilationsController {
  constructor(
    private readonly departmentsPerRecopilationsService: DepartmentsPerRecopilationsService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { departmentsPerRecopilations, count } =
      await this.departmentsPerRecopilationsService.findAll({
        page,
        itemsPerPage,
        orderBy,
        orderType,
        filters
      })

    return constructPaginatedItemsDto(
      departmentsPerRecopilations,
      count,
      page,
      itemsPerPage
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.departmentsPerRecopilationsService.findOne(id)
  }

  @Put()
  async create(
    @Body()
    createDepartmentsPerRecopilationDto: CreateDepartmentsPerRecopilationDto
  ) {
    const res = await this.departmentsPerRecopilationsService.set(
      createDepartmentsPerRecopilationDto
    )

    this.eventEmitter.emit(
      'matrix.changed',
      new MatrixChangedEvent(createDepartmentsPerRecopilationDto.recopilationId)
    )

    return res
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateDepartmentsPerRecopilationDto: UpdateDepartmentPerRecopilationDto
  ) {
    return this.departmentsPerRecopilationsService.update(
      id,
      updateDepartmentsPerRecopilationDto
    )
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.departmentsPerRecopilationsService.remove(id)
  }
}
