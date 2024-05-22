import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
  Query
} from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { Response } from 'express'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'
import { ApiTags } from '@nestjs/swagger'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'

@ApiTags('Indicators')
@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get()
  async getAllIndicators(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Res() response: Response
  ) {
    const { indicators, count } = await this.indicatorsService.getAllIndicators(
      {
        page,
        itemsPerPage
      }
    )

    const paginatedItems = constructPaginatedItemsDto(
      indicators,
      count,
      page,
      itemsPerPage
    )
    return response.json(paginatedItems)
  }

  @Get('/:id')
  async getIndicator(@Param('id') id: string, @Res() response: Response) {
    const indicator = await this.indicatorsService.getOneIndicator(Number(id))
    return response.json(indicator)
  }

  @Post()
  @HttpCode(201)
  async createIndicator(
    @Body() newIndicador: CreateIndicatorDto,
    @Res() response: Response
  ) {
    const createdIndicator =
      await this.indicatorsService.createIndicator(newIndicador)
    return response.json(createdIndicator)
  }

  @Put('/:id')
  async updateIndicator(
    @Param('id') id: string,
    @Body() updatedIndicador: UpdateIndicatorDto,
    @Res() response: Response
  ) {
    const indicator = await this.indicatorsService.updateIndicator(
      Number(id),
      updatedIndicador
    )
    return response.json(indicator)
  }

  @Delete('/:id')
  async deleteIndicator(@Param('id') id: string, @Res() response: Response) {
    await this.indicatorsService.deleteIndicator(Number(id))
    return response.status(204).send()
  }
}
