import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { Response } from 'express'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'

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
    try {
      const indicator = await this.indicatorsService.getOneIndicator(Number(id))
      return response.json(indicator)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500).json({ message: 'Server intern error' })
    }
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
    try {
      const indicator = await this.indicatorsService.updateIndicator(
        Number(id),
        updatedIndicador
      )
      return response.json(indicator)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500).json({ message: 'Server intern error' })
    }
  }

  @Delete('/:id')
  async deleteIndicator(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.indicatorsService.deleteIndicator(Number(id))
      return response.status(204).send()
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500).json({ message: 'Server intern error' })
    }
  }
}
