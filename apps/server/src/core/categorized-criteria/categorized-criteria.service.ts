import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategorizedCriteria } from './entities/categorized-criterion.entity'
import { CreateCategorizedCriteriaDto } from './dto/create-categorized-criterion.dto'
import { UpdateCategorizedCriterionDto } from './dto/update-categorized-criterion.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { Category } from '../categories/entities/category.entity'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-categorized-criteria-by-param.dto'
import { IndicatorPerRecopilation } from '../indicators-per-recopilations/entities/indicator-per-recopilatio.entity'

@Injectable()
export class CategorizedCriteriaService {
  constructor(
    @InjectRepository(CategorizedCriteria)
    private readonly categorizedCriteriaRepository: Repository<CategorizedCriteria>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Criteria)
    private readonly criterionRepository: Repository<Criteria>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(IndicatorPerRecopilation)
    private readonly indicatorPerRecopilationRepository: Repository<IndicatorPerRecopilation>
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
    const [categorizedCriteria, count] =
      await this.categorizedCriteriaRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'criteria', 'category'],
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { categorizedCriteria, count }
  }

  async findOne(id: number): Promise<CategorizedCriteria> {
    return this.categorizedCriteriaRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'criterion', 'category']
    })
  }

  async create(
    createCategorizedCriteriaDto: CreateCategorizedCriteriaDto
  ): Promise<CategorizedCriteria> {
    const { recopilationId, criteriaId, categoryId } =
      createCategorizedCriteriaDto

    const [indicatorsPerRecopilation, criteria, category] = await Promise.all([
      this.indicatorPerRecopilationRepository.find({
        where: { recopilation: { id: recopilationId } },
        relations: ['indicator', 'recopilation']
      }),
      this.criterionRepository.findOneOrFail({
        where: { id: criteriaId },
        relations: ['indicator']
      }),
      this.categoryRepository.findOneOrFail({
        where: { id: categoryId },
        relations: ['indicator']
      })
    ])

    const existsConflict =
      !indicatorsPerRecopilation.some(
        (ipr) => ipr.indicator.index === criteria.indicator.index
      ) ||
      !indicatorsPerRecopilation.some(
        (ipr) => ipr.indicator.index === category.indicator.index
      )

    if (existsConflict) {
      throw new ConflictException(
        'The recopilation does not have the indicator related to the criteria and category'
      )
    }

    const categorizedCriteria = this.categorizedCriteriaRepository.create({
      recopilation: indicatorsPerRecopilation[0].recopilation,
      criteria,
      category
    })

    return this.categorizedCriteriaRepository.save(categorizedCriteria)
  }

  async update(
    id: number,
    updateCategorizedCriteriaDto: UpdateCategorizedCriterionDto
  ): Promise<CategorizedCriteria> {
    const categorizedCriteria =
      await this.categorizedCriteriaRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'criterion', 'category']
      })

    const { recopilationId, criteriaId, categoryId } =
      updateCategorizedCriteriaDto

    const [recopilation, criteria, category] = await Promise.all([
      this.recopilationRepository.findOneOrFail({
        where: { id: recopilationId },
        relations: ['indicatorsPerRecopilations']
      }),
      this.criterionRepository.findOneOrFail({
        where: { id: criteriaId },
        relations: ['indicator']
      }),
      this.categoryRepository.findOneOrFail({
        where: { id: categoryId },
        relations: ['indicator']
      })
    ])

    const existsConflict =
      !recopilation.indicatorsPerRecopilations.some(
        (ipr) => ipr.indicator.index === criteria.indicator.index
      ) ||
      !recopilation.indicatorsPerRecopilations.some(
        (ipr) => ipr.indicator.index === category.indicator.index
      )

    if (existsConflict) {
      throw new ConflictException(
        'The recopilation does not have the indicator related to the criteria and category'
      )
    }

    categorizedCriteria.recopilation = recopilation
    categorizedCriteria.criteria = criteria
    categorizedCriteria.category = category

    await this.categorizedCriteriaRepository.save(categorizedCriteria)

    return this.categorizedCriteriaRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'criterion', 'category']
    })
  }

  async remove(id: number): Promise<void> {
    const categorizedCriteria =
      await this.categorizedCriteriaRepository.findOneOrFail({
        where: { id }
      })
    await this.categorizedCriteriaRepository.remove(categorizedCriteria)
  }
}
