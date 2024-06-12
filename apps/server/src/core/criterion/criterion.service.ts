import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCriteriaDto } from './dto/create-criteria.dto'
import { UpdateCriteriaDto } from './dto/update-criteria.dto'
import { Criteria } from './entities/criteria.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-criteria-by-param.dto'
import { Indicator } from '../indicators/entities/indicator.entity'
import { CategorizedCriteria } from '../categorized-criteria/entities/categorized-criterion.entity'

@Injectable()
export class CriterionService {
  constructor(
    @InjectRepository(Criteria)
    private readonly criterionRepository: Repository<Criteria>,
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>,
    @InjectRepository(CategorizedCriteria)
    private readonly categorizedCriteriaRepository: Repository<CategorizedCriteria>
  ) {}

  async createCriterion(
    createCriterionDto: CreateCriteriaDto
  ): Promise<Criteria> {
    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: createCriterionDto.indicatorIndex
    })

    const criterion = this.criterionRepository.create({
      ...createCriterionDto,
      indicator
    })

    return this.criterionRepository.save(criterion)
  }

  async getAllCriteria({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [criteria, count] = await this.criterionRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters),
      relations: ['indicator']
    })

    return { criteria, count }
  }

  async getOneCriterion(id: number): Promise<Criteria> {
    const criterion = await this.criterionRepository.findOneOrFail({
      where: { id },
      relations: ['indicator']
    })
    return criterion
  }

  async updateCriterion(
    id: number,
    updateCriteriaDto: UpdateCriteriaDto
  ): Promise<Criteria> {
    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: updateCriteriaDto.indicatorIndex
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { indicatorIndex: _, ...dtoWithoutIndicatorIndex } = updateCriteriaDto

    const updatedCriteria = this.criterionRepository.create({
      ...dtoWithoutIndicatorIndex,
      indicator
    })

    await this.criterionRepository.update({ id }, updatedCriteria)

    return await this.criterionRepository.findOneByOrFail({ id })
  }

  async deleteCriterion(id): Promise<void> {
    await this.criterionRepository.findOneByOrFail({ id })

    await this.criterionRepository.delete({
      id
    })

    return
  }

  async criterionByIndicator(indicatorId: number): Promise<Criteria[]> {
    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: indicatorId
    })

    const criterion = await this.criterionRepository.find({
      where: { indicator: indicator }
    })

    return criterion
  }

  async criterionByRecopilation(recopilationId: number): Promise<Criteria[]> {
    const categorizedCriterias = await this.categorizedCriteriaRepository.find({
      where: { recopilation: { id: recopilationId } },
      relations: ['criteria']
    })

    return categorizedCriterias.map(
      (categorizedCriteria) => categorizedCriteria.criteria
    )
  }
}
