import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Indicator } from './entities/indicator.entity'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-indicators-by-param.dto'

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>
  ) {}

  async createIndicator(
    createIndicatorDto: CreateIndicatorDto
  ): Promise<Indicator> {
    const indicator = this.indicatorRepository.create(createIndicatorDto)
    await this.indicatorRepository.insert(indicator)
    return indicator
  }

  async getAllIndicators({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [indicators, count] = await this.indicatorRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters)
    })
    return { indicators, count }
  }

  async getOneIndicator(index: number): Promise<Indicator> {
    try {
      const indicator = await this.indicatorRepository.findOneByOrFail({
        index
      })
      return indicator
    } catch (error) {
      throw new NotFoundException('Indicador ' + index + ' no encontrado.')
    }
  }

  async updateIndicator(
    index: number,
    updateIndicatorDto: UpdateIndicatorDto
  ): Promise<Indicator> {
    try {
      await this.indicatorRepository.update(index, updateIndicatorDto)
      const updatedIndicator = await this.indicatorRepository.findOneByOrFail({
        index: updateIndicatorDto.index ?? index
      })
      return updatedIndicator
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Indicador no encontrado para actualizar.')
      } else {
        throw new BadRequestException(
          'No se pudo actualizar el indicador ' + index + '.'
        )
      }
    }
  }

  async deleteIndicator(index: number): Promise<void> {
    try {
      await this.indicatorRepository.delete(index)
    } catch (error) {
      throw new NotFoundException(
        'Indicador ' + index + ' no encontrado para eliminar.'
      )
    }
  }
}
