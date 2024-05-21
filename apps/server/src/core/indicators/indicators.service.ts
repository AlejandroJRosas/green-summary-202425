import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Indicator } from './entities/indicator.entity'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>
  ) {}

  async createIndicator(
    createIndicatorDto: CreateIndicatorDto
  ): Promise<Indicator> {
    const indicador = this.indicatorRepository.create(createIndicatorDto)
    return this.indicatorRepository.save(indicador)
  }

  async getAllIndicators(): Promise<Indicator[]> {
    return this.indicatorRepository.find()
  }

  async getOneIndicator(index: number): Promise<Indicator> {
    const indicator = await this.indicatorRepository.findOneByOrFail({ index })
    return indicator
  }

  async updateIndicator(
    index: number,
    updateIndicatorDto: UpdateIndicatorDto
  ): Promise<Indicator> {
    await this.indicatorRepository.update(index, updateIndicatorDto)
    const updatedIndicador = await this.indicatorRepository.findOneByOrFail({
      index
    })
    return updatedIndicador
  }

  async deleteIndicator(index: number): Promise<void> {
    const result = await this.indicatorRepository.delete(index)
    if (result.affected === 0) {
      throw new NotFoundException(`Indicador with ID ${index} not found`)
    }
  }
}
