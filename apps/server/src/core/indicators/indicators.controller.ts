import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  HttpStatus
} from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'
import { ApiTags } from '@nestjs/swagger'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-indicators-by-param.dto'

@ApiTags('Indicators')
@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get()
  async getAllIndicators(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'index' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { indicators, count } = await this.indicatorsService.getAllIndicators(
      {
        page,
        itemsPerPage,
        orderBy,
        orderType,
        filters
      }
    )

    const paginatedItems = constructPaginatedItemsDto(
      indicators,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get('/:id')
  async getIndicator(@Param('id') id: string) {
    const indicator = await this.indicatorsService.getOneIndicator(Number(id))
    return indicator
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createIndicator(@Body() newIndicador: CreateIndicatorDto) {
    const createdIndicator =
      await this.indicatorsService.createIndicator(newIndicador)
    return createdIndicator
  }

  @Put('/:id')
  async updateIndicator(
    @Param('id') id: string,
    @Body() updatedIndicador: UpdateIndicatorDto
  ) {
    const indicator = await this.indicatorsService.updateIndicator(
      Number(id),
      updatedIndicador
    )
    return indicator
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteIndicator(@Param('id') id: string) {
    await this.indicatorsService.deleteIndicator(Number(id))
  }
}
