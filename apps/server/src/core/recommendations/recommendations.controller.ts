import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
  HttpCode
} from '@nestjs/common'
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
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRecommendDto: CreateRecommendationDto) {
    const result = await this.recommendService.create(createRecommendDto)
    return result
  }

  @Get()
  async findAll(@Query() { page = 1, itemsPerPage = 10 }: PaginationParams) {
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
    return paginatedItems
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result = await this.recommendService.findOne(id)
    return result
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.recommendService.remove(id)
  }
}
