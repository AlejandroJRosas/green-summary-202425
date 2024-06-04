import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Query
} from '@nestjs/common'
import { RecopilationsService } from './recopilations.service'
import { CreateRecopilationDto } from './dto/create-recopilation.dto'
import { UpdateRecopilationDto } from './dto/update-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-recopilations-by-param.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'

@ApiTags('Recopilations')
@Controller('recopilations')
@Roles(Role.Coordinator, Role.Admin)
export class RecopilationsController {
  constructor(private readonly recopilationsService: RecopilationsService) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { recopilation, count } = await this.recopilationsService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    const paginatedItems = constructPaginatedItemsDto(
      recopilation,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const recopilation = await this.recopilationsService.findOne(+id)

    return recopilation
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() recopilationData: CreateRecopilationDto) {
    const createdRecopilation =
      await this.recopilationsService.create(recopilationData)

    return createdRecopilation
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() recopilationData: UpdateRecopilationDto
  ) {
    const updatedRecopilation = await this.recopilationsService.update(
      +id,
      recopilationData
    )

    return updatedRecopilation
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.recopilationsService.remove(+id)
  }
}
