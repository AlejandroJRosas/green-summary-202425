import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common'
import { CriteriaPerRecopilationsService } from './criterion-per-recopilations.service'
import { CreateCriteriaPerRecopilationDto } from './dto/create-criteria-per-recopilation.dto'
import { UpdateCriteriaPerRecopilationDto } from './dto/update-criteria-per-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-criterion-per-recopilations-by-param.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'

@ApiTags('Criteria_Per_Recopilations')
@Controller('criteria-per-recopilations')
@Roles(Role.Coordinator, Role.Admin)
export class CriteriaPerRecopilationsController {
  constructor(
    private readonly criteriaPerRecopilationsService: CriteriaPerRecopilationsService
  ) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { criteriaPerRecopilations, count } =
      await this.criteriaPerRecopilationsService.findAll({
        page,
        itemsPerPage,
        orderBy,
        orderType,
        filters
      })

    return constructPaginatedItemsDto(
      criteriaPerRecopilations,
      count,
      page,
      itemsPerPage
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.criteriaPerRecopilationsService.findOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCriteriaPerRecopilationsDto: CreateCriteriaPerRecopilationDto
  ) {
    return this.criteriaPerRecopilationsService.create(
      createCriteriaPerRecopilationsDto
    )
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCriteriaPerRecopilationsDto: UpdateCriteriaPerRecopilationDto
  ) {
    return this.criteriaPerRecopilationsService.update(
      id,
      updateCriteriaPerRecopilationsDto
    )
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.criteriaPerRecopilationsService.remove(id)
  }
}
