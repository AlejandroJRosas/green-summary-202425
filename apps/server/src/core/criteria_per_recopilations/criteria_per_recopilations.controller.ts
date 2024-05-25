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
import { CriteriaPerRecopilationsService } from './criteria_per_recopilations.service'
import { CreateCriteriaPerRecopilationDto } from '../criteria_per_recopilations/dto/create-criteria_per_recopilation.dto'
import { UpdateCriteriaPerRecopilationDto } from '../criteria_per_recopilations/dto/update-criteria_per_recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Criteria_Per_Recopilations')
@Controller('criteria-per-recopilations')
export class CriteriaPerRecopilationsController {
  constructor(
    private readonly criteriaPerRecopilationsService: CriteriaPerRecopilationsService
  ) {}

  @Get()
  async findAll(@Query() { page = 1, itemsPerPage = 10 }: PaginationParams) {
    const { criteriaPerRecopilations, count } =
      await this.criteriaPerRecopilationsService.findAll({
        page,
        itemsPerPage
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
