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
import { DepartmentsPerRecopilationsService } from './departments_per_recopilations.service'
import { CreateDepartmentsPerRecopilationDto } from './dto/create-departments_per_recopilation.dto'
import { UpdateDepartmentsPerRecopilationDto } from './dto/update-departments_per_recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Departments_Per_Recopilations')
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
    createDepartmentsPerRecopilationDto: CreateDepartmentsPerRecopilationDto
  ) {
    return this.departmentsPerRecopilationsService.create(
      createDepartmentsPerRecopilationDto
    )
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateDepartmentsPerRecopilationDto: UpdateDepartmentsPerRecopilationDto
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
