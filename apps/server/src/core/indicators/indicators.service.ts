import { Injectable, NotFoundException } from '@nestjs/common'
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
    const indicator = await this.indicatorRepository.findOneByOrFail({ index })
    return indicator
  }

  async indicatorsByRecopilation(
    recopilationId: number,
    { orderBy, orderType }: OrderByParamDto & OrderTypeParamDto
  ) {
    const indicators = await this.indicatorRepository.find({
      where: {
        recopilationsPerIndicator: {
          recopilation: {
            id: recopilationId
          }
        }
      },
      relations: {
        recopilationsPerIndicator: {
          recopilation: {
            categorizedCriterion: {
              category: true,
              criteria: {
                indicator: true
              }
            }
          }
        }
      },
      order: {
        [orderBy]: orderType,
        recopilationsPerIndicator: {
          indicator: { index: 'ASC' },
          recopilation: {
            categorizedCriterion: {
              category: { id: 'ASC' },
              criteria: { id: 'ASC' }
            }
          }
        }
      }
    })

    const formattedIndicators = indicators.map((i) => {
      const categories = []
      i.recopilationsPerIndicator[0].recopilation.categorizedCriterion.forEach(
        (cc) => {
          if (cc.criteria.indicator.index !== i.index) return

          const category = cc.category
          const { indicator, ...criterion } = cc.criteria

          const alreadyInsertedCategory = categories.find(
            (c) => c.id === category.id
          )

          if (alreadyInsertedCategory) {
            alreadyInsertedCategory.criteria.push(criterion)
          } else {
            categories.push({ ...category, criteria: [criterion] })
          }
        }
      )

      return {
        index: i.index,
        name: i.name,
        alias: i.alias,
        helpText: i.helpText,
        categories: categories
      }
    })

    return formattedIndicators
  }

  async updateIndicator(
    index: number,
    updateIndicatorDto: UpdateIndicatorDto
  ): Promise<Indicator> {
    await this.indicatorRepository.update(index, updateIndicatorDto)
    const updatedIndicador = await this.indicatorRepository.findOneByOrFail({
      index: updateIndicatorDto.index ?? index
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
