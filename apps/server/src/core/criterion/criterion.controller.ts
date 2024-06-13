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
    try {
      const criterion =
        await this.criterionService.createCriterion(createCriterionDto)
      return criterion
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  @Get()
  async getAllCriteria(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
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

  @Get(':id')
  async getOneCriterion(@Param('id') id: string) {
    const criterion = await this.criterionService.getOneCriterion(Number(id))
    return criterion
  }

  @Patch(':id')
  async updateCriterion(
    @Param('id') id: string,
    @Body() updateCriteriaDto: UpdateCriteriaDto
  ) {
    const criterion = await this.criterionService.updateCriterion(
      Number(id),
      updateCriteriaDto
    )
    return criterion
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCriterion(@Param('id') id: string) {
    await this.criterionService.deleteCriterion(Number(id))
  }

  @Get('/indicator/:indicatorIndex')
  async getCriterionByIndicator(
    @Param('indicatorIndex') indicatorIndex: string
  ) {
    const criterion = await this.criterionService.criterionByIndicator(
      Number(indicatorIndex)
    )
    return criterion
  }

  @Get('/recopilation/:recopilationId')
  async getCriterionByRecopilation(
    @Param('recopilationId') recopilationId: string
  ) {
    const criterion = await this.criterionService.criterionByRecopilation(
      Number(recopilationId)
    )
    return criterion
  }
}
