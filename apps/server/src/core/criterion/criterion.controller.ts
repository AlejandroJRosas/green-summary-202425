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
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'

@ApiTags('Criteria')
@Controller('criteria')
@Roles(Role.Coordinator, Role.Admin)
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
    @Body() updateCriterionDto: UpdateCriteriaDto
  ) {
    const criterion = await this.criterionService.updateCriterion(
      Number(id),
      updateCriterionDto
    )
    return criterion
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCriterion(@Param('id') id: string) {
    await this.criterionService.deleteCriterion(Number(id))
  }
}
