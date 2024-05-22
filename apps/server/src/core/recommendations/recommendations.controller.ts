import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query
} from '@nestjs/common'
import { Response } from 'express'
import { RecommendationsService } from './recommendations.service'
import { CreateRecommendationDto } from './dto/create-recommendation.dto'
import { ApiTags } from '@nestjs/swagger'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'

@ApiTags('Recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendService: RecommendationsService) {}

  @Post()
  async create(
    @Body() createRecommendDto: CreateRecommendationDto,
    @Res() res: Response
  ) {
    const result = await this.recommendService.create(createRecommendDto)
    return res.status(HttpStatus.CREATED).json(result)
  }

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Res() res: Response
  ) {
    const { recommendations, count } = await this.recommendService.findAll({
      page,
      itemsPerPage
    })

    const paginatedItems = constructPaginatedItemsDto(
      recommendations,
      count,
      page,
      itemsPerPage
    )
    return res.json(paginatedItems)
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const result = await this.recommendService.findOne(id)
    return res.status(HttpStatus.OK).json(result)
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.recommendService.remove(id)
    return res.status(HttpStatus.NO_CONTENT).send()
  }
}
