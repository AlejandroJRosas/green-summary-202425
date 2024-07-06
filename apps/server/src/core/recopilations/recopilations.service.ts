import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  EntityNotFoundError,
  Equal,
  In,
  LessThan,
  MoreThan,
  Repository
} from 'typeorm'
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
import { CategorizedCriteria } from '../categorized-criteria/entities/categorized-criterion.entity'
import { RecommendCategoriesDto } from './dto/recommend-categories.dto'
import { Department } from '../users/entities/department.entity'
import { Recommendation } from '../recommendations/entities/recommendation.entity'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'
import { RecopilationDto } from './dto/recopilation.dto'

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
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    @InjectRepository(IndicatorPerRecopilation)
    private indicatorsPerRecopilationRepository: Repository<IndicatorPerRecopilation>,
    @InjectRepository(CategorizedCriteria)
    private categorizedCriteriaRepository: Repository<CategorizedCriteria>,
    @InjectRepository(Recommendation)
    private recommendationRepository: Repository<Recommendation>,
    @InjectRepository(DepartmentPerRecopilation)
    private departmentsPerRecopilationsRepository: Repository<DepartmentPerRecopilation>
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
    const recopilation = await this.recopilationsRepository.findOneByOrFail({
      id
    })

    return recopilation
  }

  async findOneDetailed(id: number) {
    const recopilation = await this.recopilationsRepository.findOneOrFail({
      where: { id },
      relations: {
        departmentsPerRecopilation: {
          department: true,
          recommendations: {
            category: true
          }
        },
        categorizedCriterion: {
          category: true,
          criteria: {
            indicator: true
          }
        },
        indicatorsPerRecopilations: {
          indicator: true
        }
      },
      order: {
        departmentsPerRecopilation: {
          recommendations: {
            category: {
              id: 'ASC'
            }
          }
        },
        indicatorsPerRecopilations: {
          indicator: {
            index: 'ASC'
          }
        },
        categorizedCriterion: {
          category: {
            id: 'ASC'
          },
          criteria: {
            id: 'ASC'
          }
        }
      }
    })

    const indicators = recopilation.indicatorsPerRecopilations.map((ipr) => {
      const { indicator } = ipr
      const categorizedCriteria = recopilation.categorizedCriterion
        .filter((cc) => cc.criteria.indicator.index === indicator.index)
        .map((cc) => {
          const { indicator: _, ...criterionWithoutIndicator } = cc.criteria
          return {
            criterion: criterionWithoutIndicator as Criteria,
            category: cc.category
          }
        })

      const categories = []

      categorizedCriteria.forEach((cc) => {
        const alreadyInsertedCategory = categories.find(
          (c) => c.id === cc.category.id
        )

        if (alreadyInsertedCategory) {
          alreadyInsertedCategory.criteria.push(cc.criterion)
        } else {
          categories.push({ ...cc.category, criteria: [cc.criterion] })
        }
      })

      return {
        ...indicator,
        categories
      }
    })

    const allCategories = indicators
      .map((i) => i.categories)
      .flat()
      .sort((a, b) => a.id - b.id)

    const departments = recopilation.departmentsPerRecopilation.map((dpr) => ({
      department: dpr.department,
      answers: allCategories.map((c) => {
        const isRecommended = dpr.recommendations.some(
          (r) => r.category.id === c.id
        )

        return { categoryId: c.id, isRecommended }
      })
    }))

    const recopilationDto = {
      id: recopilation.id,
      name: recopilation.name,
      description: recopilation.description,
      startDate: recopilation.startDate,
      endDate: recopilation.endDate,
      departmentEndDate: recopilation.departmentEndDate,
      isReady: recopilation.isReady,
      indicators,
      departments
    }

    return recopilationDto
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

    const recopilation = await this.recopilationsRepository.findOneOrFail({
      where: { id: recopilationId },
      relations: ['categorizedCriterion', 'indicatorsPerRecopilations']
    })

    let categorizedCriteriaToInsert: CategorizedCriteria[] = []
    let indicatorsPerRecopilationsToInsert: IndicatorPerRecopilation[] = []

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

        if (!indicator.criterion.some((c) => c.id === criteria.id)) {
          throw new EntityNotFoundError(Criteria, criteria.id)
        }

        if (!indicator.categories.some((c) => c.id === category.id)) {
          throw new EntityNotFoundError(Category, category.id)
        }

        const categorizedCriteria = this.categorizedCriteriaRepository.create({
          criteria,
          category,
          recopilation
        })

        categorizedCriteriaToInsert.push(categorizedCriteria)
      }

      const indicatorPerRecopilation =
        this.indicatorsPerRecopilationRepository.create({
          indicator,
          recopilation
        })

      indicatorsPerRecopilationsToInsert.push(indicatorPerRecopilation)
    }

    await Promise.all([
      await this.categorizedCriteriaRepository.remove(
        recopilation.categorizedCriterion
      ),
      await this.indicatorsPerRecopilationRepository.remove(
        recopilation.indicatorsPerRecopilations
      )
    ])

    await Promise.all([
      await this.categorizedCriteriaRepository.save(
        categorizedCriteriaToInsert
      ),
      await this.indicatorsPerRecopilationRepository.save(
        indicatorsPerRecopilationsToInsert
      )
    ])

    recopilation.categorizedCriterion = categorizedCriteriaToInsert
    recopilation.indicatorsPerRecopilations = indicatorsPerRecopilationsToInsert

    return recopilation
  }

  async recommendCategories(recommendCategoriesDto: RecommendCategoriesDto) {
    const { recopilationId, departments } = recommendCategoriesDto

    const recommendations: Recommendation[] = []

    for (const dep of departments) {
      const departmentPerRecopilation =
        await this.departmentsPerRecopilationsRepository.findOneOrFail({
          where: {
            department: { id: dep.departmentId },
            recopilation: { id: recopilationId }
          }
        })

      for (const cat of dep.categories) {
        const categorizedCriteria =
          await this.categorizedCriteriaRepository.findOneOrFail({
            where: {
              recopilation: { id: recopilationId },
              category: { id: cat.categoryId }
            },
            relations: ['category']
          })

        recommendations.push(
          this.recommendationRepository.create({
            category: categorizedCriteria.category,
            departmentPerRecopilation
          })
        )
      }
    }

    const oldRecommendations = await this.recommendationRepository.find({
      relations: ['departmentPerRecopilation'],
      where: {
        departmentPerRecopilation: {
          recopilation: { id: recopilationId },
          department: { id: In(departments.map((d) => d.departmentId)) }
        }
      }
    })

    await this.recommendationRepository.remove(oldRecommendations)

    return await this.recommendationRepository.save(recommendations)
  }

  async getActiveRecopilations({
    orderBy,
    orderType
  }: OrderByParamDto & OrderTypeParamDto) {
    const currentDateString = new Date()

    return this.recopilationsRepository.find({
      where: {
        startDate: LessThan(currentDateString),
        endDate: MoreThan(currentDateString),
        departmentEndDate: MoreThan(currentDateString),
        isReady: Equal(true)
      },
      order: { [orderBy]: orderType }
    })
  }
}
