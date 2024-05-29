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
import { DepartmentsPerRecopilationsService } from './departments-per-recopilations.service'
import { CreateDepartmentPerRecopilationDto } from './dto/create-department-per-recopilation.dto'
import { UpdateDepartmentPerRecopilationDto } from './dto/update-department-per-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Departments-Per-Recopilations')
@Controller('departments-per-recopilations')
export class DepartmentsPerRecopilationsController {
  constructor(
    private readonly departmentsPerRecopilationsService: DepartmentsPerRecopilationsService
  ) {}

  @Get()
  async findAll(@Query() { page = 1, itemsPerPage = 10 }: PaginationParams) {
    const { departmentsPerRecopilations, count } =
      await this.departmentsPerRecopilationsService.findAll({
        page,
        itemsPerPage
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

  @Post()
  async create(
    @Body()
    createDepartmentsPerRecopilationDto: CreateDepartmentPerRecopilationDto
  ) {
    return this.departmentsPerRecopilationsService.create(
      createDepartmentsPerRecopilationDto
    )
  }

  @Put(':id')
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
