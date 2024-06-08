import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { CreateCriteriaDto } from './dto/create-criteria.dto'
import { UpdateCriteriaDto } from './dto/update-criteria.dto'
import { Criteria } from './entities/criteria.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-criteria-by-param.dto'
import { Indicator } from '../indicators/entities/indicator.entity'

@Injectable()
export class CriterionService {
  constructor(
    @InjectRepository(Criteria)
    private readonly criterionRepository: Repository<Criteria>,
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>
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
    updateCriterionDto: UpdateCriteriaDto
  ): Promise<Criteria> {
    await this.criterionRepository.update({ id }, updateCriterionDto)

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

    if (criterion.length === 0) {
      throw new EntityNotFoundError(Criteria, {
        indicatorIndex: indicator.index
      })
    }

    return criterion
  }
}
