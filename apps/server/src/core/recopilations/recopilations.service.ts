import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Recopilation } from './entities/recopilation.entity'
import { UpdateRecopilationDto } from './dto/update-recopilation.dto'
import { CreateRecopilationDto } from './dto/create-recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-recopilations-by-param.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { RelateIndicatorsToRecopilationDto } from './dto/relate-indicators-to-recopilation.dto'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { Category } from '../categories/entities/category.entity'
import { IndicatorPerRecopilation } from '../indicators-per-recopilations/entities/indicator-per-recopilatio.entity'

@Injectable()
export class RecopilationsService {
  constructor(
    @InjectRepository(Recopilation)
    private recopilationsRepository: Repository<Recopilation>,
    @InjectRepository(Indicator)
    private indicatorsRepository: Repository<Indicator>,
    @InjectRepository(Criteria)
    private criterionRepository: Repository<Criteria>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(IndicatorPerRecopilation)
    private indicatorsPerRecopilationRepository: Repository<IndicatorPerRecopilation>
  ) {}

  async findAll({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [recopilation, count] =
      await this.recopilationsRepository.findAndCount({
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { recopilation, count }
  }

  async findOne(id: number): Promise<Recopilation> {
    return this.recopilationsRepository.findOneByOrFail({ id })
  }

  async create(recopilationData: CreateRecopilationDto): Promise<Recopilation> {
    const recopilation = this.recopilationsRepository.create(recopilationData)

    return this.recopilationsRepository.save(recopilation)
  }

  async update(
    id: number,
    recopilationData: UpdateRecopilationDto
  ): Promise<Recopilation> {
    await this.recopilationsRepository.findOneByOrFail({
      id
    })

    await this.recopilationsRepository.update(id, recopilationData)

    return this.recopilationsRepository.findOneByOrFail({ id })
  }

  async remove(id: number): Promise<void> {
    const recopilation = await this.recopilationsRepository.findOneByOrFail({
      id
    })

    await this.recopilationsRepository.remove([recopilation])
  }

  async relateToIndicators(
    relateIndicatorsToRecopilationDto: RelateIndicatorsToRecopilationDto
  ) {
    const { recopilationId, indicators } = relateIndicatorsToRecopilationDto

    const recopilation = await this.recopilationsRepository.findOneByOrFail({
      id: recopilationId
    })

    for (const i of indicators) {
      const indicator = await this.indicatorsRepository.findOneOrFail({
        where: { index: i.indicatorId },
        relations: ['categories', 'criterion']
      })

      for (const c of i.criterion) {
        const [criteria, category] = await Promise.all([
          this.criterionRepository.findOneByOrFail({ id: c.criteriaId }),
          this.categoriesRepository.findOneByOrFail({ id: c.categoryId })
        ])

        indicator.criterion.push(criteria)
        indicator.categories.push(category)
      }

      const indicatorPerRepository =
        this.indicatorsPerRecopilationRepository.create({
          indicator,
          recopilation
        })

      recopilation.indicatorsPerRecopilations.push(indicatorPerRepository)
    }

    const res = await this.recopilationsRepository.save(recopilation)

    return res
  }
}
