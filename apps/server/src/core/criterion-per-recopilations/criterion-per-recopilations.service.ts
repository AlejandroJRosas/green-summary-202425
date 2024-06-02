import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CriteriaPerRecopilation } from './entities/criteria-per-recopilation.entity'
import { CreateCriteriaPerRecopilationDto } from './dto/create-criteria-per-recopilation.dto'
import { UpdateCriteriaPerRecopilationDto } from './dto/update-criteria-per-recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-criterion-per-recopilations-by-param.dto'

@Injectable()
export class CriteriaPerRecopilationsService {
  constructor(
    @InjectRepository(CriteriaPerRecopilation)
    private readonly criteriaPerRecopilationsRepository: Repository<CriteriaPerRecopilation>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Criteria)
    private readonly criterionRepository: Repository<Criteria>
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
    const [criteriaPerRecopilations, count] =
      await this.criteriaPerRecopilationsRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'criterion'],
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { criteriaPerRecopilations, count }
  }

  async findOne(id: number): Promise<CriteriaPerRecopilation> {
    return this.criteriaPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'criterion']
    })
  }

  async create(
    createCriteriaPerRecopilationDto: CreateCriteriaPerRecopilationDto
  ): Promise<CriteriaPerRecopilation> {
    const { recopilationId, indicatorIndex, subIndex } =
      createCriteriaPerRecopilationDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    const criterion = await this.criterionRepository.findOneByOrFail({
      indicatorIndex,
      subIndex
    })

    const criteriaPerRecopilation =
      this.criteriaPerRecopilationsRepository.create({
        recopilation,
        criterion
      })

    return this.criteriaPerRecopilationsRepository.save(criteriaPerRecopilation)
  }

  async update(
    id: number,
    updateCriteriaPerRecopilationDto: UpdateCriteriaPerRecopilationDto
  ): Promise<CriteriaPerRecopilation> {
    const criteriaPerRecopilation =
      await this.criteriaPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'criterion']
      })

    const { recopilationId, indicatorIndex, subIndex } =
      updateCriteriaPerRecopilationDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    criteriaPerRecopilation.recopilation = recopilation

    const criterion = await this.criterionRepository.findOneByOrFail({
      indicatorIndex,
      subIndex
    })
    criteriaPerRecopilation.criterion = criterion

    await this.criteriaPerRecopilationsRepository.save(criteriaPerRecopilation)

    return this.criteriaPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'criterion']
    })
  }

  async remove(id: number): Promise<void> {
    const criteriaPerRecopilation =
      await this.criteriaPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'criterion']
      })
    await this.criteriaPerRecopilationsRepository.remove(
      criteriaPerRecopilation
    )
  }
}