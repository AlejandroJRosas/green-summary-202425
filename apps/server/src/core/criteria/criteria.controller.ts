import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode
} from '@nestjs/common'
import { CriterionService } from './criteria.service'
import { CreateCriterionDto } from './dto/create-criterion.dto'
import { UpdateCriterionDto } from './dto/update-criterion.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Criteria')
@Controller('criteria')
export class CriterionController {
  constructor(private readonly criterionService: CriterionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async reateCriterion(@Body() createCriterionDto: CreateCriterionDto) {
    const criterion =
      await this.criterionService.createCriterion(createCriterionDto)
    return criterion
  }

  @Get()
  async getAllCriteria(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams
  ) {
    const { criteria, count } = await this.criterionService.getAllCriteria({
      page,
      itemsPerPage
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

  @Put(':indicatorIndex/:subIndex')
  async updateCriterion(
    @Param('indicatorIndex') indicatorIndex: string,
    @Param('subIndex') subIndex: string,
    @Body() updateCriterionDto: UpdateCriterionDto
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
