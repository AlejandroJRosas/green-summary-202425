import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  Patch
} from '@nestjs/common'
import { CriterionService } from './criterion.service'
import { CreateCriteriaDto } from './dto/create-criteria.dto'
import { UpdateCriteriaDto } from './dto/update-criteria.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-criteria-by-param.dto'

@ApiTags('Criteria')
@Controller('criteria')
export class CriterionController {
  constructor(private readonly criterionService: CriterionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCriterion(@Body() createCriterionDto: CreateCriteriaDto) {
    const criterion =
      await this.criterionService.createCriterion(createCriterionDto)
    return criterion
  }

  @Get()
  async getAllCriteria(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'indicatorIndex' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { criteria, count } = await this.criterionService.getAllCriteria({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    const paginatedItems = constructPaginatedItemsDto(
      criteria,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get(':indicatorIndex/:subIndex')
  async getOneCriterion(
    @Param('indicatorIndex') indicatorIndex: string,
    @Param('subIndex') subIndex: string
  ) {
    const criterion = await this.criterionService.getOneCriterion(
      Number(indicatorIndex),
      Number(subIndex)
    )
    return criterion
  }

  @Patch(':indicatorIndex/:subIndex')
  async updateCriterion(
    @Param('indicatorIndex') indicatorIndex: string,
    @Param('subIndex') subIndex: string,
    @Body() updateCriterionDto: UpdateCriteriaDto
  ) {
    const criterion = await this.criterionService.updateCriterion(
      Number(indicatorIndex),
      Number(subIndex),
      updateCriterionDto
    )
    return criterion
  }

  @Delete(':indicatorIndex/:subIndex')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCriterion(
    @Param('indicatorIndex') indicatorIndex: string,
    @Param('subIndex') subIndex: string
  ) {
    await this.criterionService.deleteCriterion(
      Number(indicatorIndex),
      Number(subIndex)
    )
  }
}
