import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  UsePipes,
  ValidationPipe,
  Query
} from '@nestjs/common'
import { CriterionService } from './criteria.service'
import { CreateCriterionDto } from './dto/create-criterion.dto'
import { UpdateCriterionDto } from './dto/update-criterion.dto'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Criteria')
@Controller('criteria')
export class CriterionController {
  constructor(private readonly criterionService: CriterionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async reateCriterion(
    @Body() createCriterionDto: CreateCriterionDto,
    @Res() response: Response
  ) {
    const criterion =
      await this.criterionService.createCriterion(createCriterionDto)
    return response.status(201).json(criterion)
  }

  @Get()
  async getAllCriteria(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Res() response: Response
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
    return response.json(paginatedItems)
  }

  @Get(':indicatorIndex/:subIndex')
  async getOneCriterion(
    @Param('indicatorIndex') indicatorIndex: string,
    @Param('subIndex') subIndex: string,
    @Res() response: Response
  ) {
    const criterion = await this.criterionService.getOneCriterion(
      Number(indicatorIndex),
      Number(subIndex)
    )
    return response.json(criterion)
  }

  @Put(':indicatorIndex/:subIndex')
  @UsePipes(new ValidationPipe())
  async updateCriterion(
    @Param('indicatorIndex') indicatorIndex: string,
    @Param('subIndex') subIndex: string,
    @Body() updateCriterionDto: UpdateCriterionDto,
    @Res() response: Response
  ) {
    const criterion = await this.criterionService.updateCriterion(
      Number(indicatorIndex),
      Number(subIndex),
      updateCriterionDto
    )
    return response.json(criterion)
  }

  @Delete(':indicatorIndex/:subIndex')
  async deleteCriterion(
    @Param('indicatorIndex') indicatorIndex: string,
    @Param('subIndex') subIndex: string,
    @Res() response: Response
  ) {
    await this.criterionService.deleteCriterion(
      Number(indicatorIndex),
      Number(subIndex)
    )
    return response.status(204).send()
  }
}
