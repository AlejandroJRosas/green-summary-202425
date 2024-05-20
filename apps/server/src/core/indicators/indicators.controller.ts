import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { Response } from 'express'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Indicators')
@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get()
  async getAllIndicators(@Res() response: Response) {
    const indicators = await this.indicatorsService.getAllIndicators()
    return response.json(indicators)
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
