import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  EntityNotFoundError,
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
    try {
      return this.recopilationsRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`Recopilación con ID ${id} no encontrada.`)
    }
  }

  async create(recopilationData: CreateRecopilationDto): Promise<Recopilation> {
    try {
      const recopilation = this.recopilationsRepository.create(recopilationData)
      return await this.recopilationsRepository.save(recopilation)
    } catch (error) {
      throw new Error('Error al crear la recopilación.')
    }
  }

  async update(
    id: number,
    recopilationData: UpdateRecopilationDto
  ): Promise<Recopilation> {
    try {
      await this.recopilationsRepository.findOneByOrFail({ id })
      await this.recopilationsRepository.update(id, recopilationData)
      return await this.recopilationsRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`Recopilación con ID ${id} no encontrada.`)
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const recopilation = await this.recopilationsRepository.findOneByOrFail({
        id
      })
      await this.recopilationsRepository.remove([recopilation])
    } catch (error) {
      throw new NotFoundException(`Recopilación con ID ${id} no encontrada.`)
    }
  }

  async relateToIndicators(
    relateIndicatorsToRecopilationDto: RelateIndicatorsToRecopilationDto
  ) {
    try {
      const { recopilationId, indicators } = relateIndicatorsToRecopilationDto

      const recopilation = await this.recopilationsRepository.findOneOrFail({
        where: { id: recopilationId },
        relations: ['categorizedCriterion', 'indicatorsPerRecopilations']
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

          if (!indicator.criterion.some((crit) => crit.id === criteria.id)) {
            throw new EntityNotFoundError(
              Criteria,
              `Criteria ID ${criteria.id} not found in indicator.`
            )
          }

          if (!indicator.categories.some((cat) => cat.id === category.id)) {
            throw new EntityNotFoundError(
              Category,
              `Category ID ${category.id} not found in indicator.`
            )
          }

          const categorizedCriteria = this.categorizedCriteriaRepository.create(
            {
              criteria,
              category
            }
          )

          recopilation.categorizedCriterion.push(categorizedCriteria)
        }

        const indicatorPerRepository =
          this.indicatorsPerRecopilationRepository.create({
            indicator,
            recopilation
          })

        recopilation.indicatorsPerRecopilations.push(indicatorPerRepository)
      }

      await this.indicatorsPerRecopilationRepository.save(
        recopilation.indicatorsPerRecopilations.map((ipr) => ({
          ...ipr,
          recopilation
        }))
      )
      await this.categorizedCriteriaRepository.save(
        recopilation.categorizedCriterion.map((cc) => ({ ...cc, recopilation }))
      )

      return recopilation
    } catch (error) {
      throw new Error('Error relacionando indicadores a la recopilación.')
    }
  }

  async recommendCategories(recommendCategoriesDto: RecommendCategoriesDto) {
    try {
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
    } catch (error) {
      throw new Error('Error al recomendar categorías para la recopilación.')
    }
  }

  async getActiveRecopilations({
    orderBy,
    orderType
  }: OrderByParamDto & OrderTypeParamDto) {
    try {
      const currentDateString = new Date()

      return this.recopilationsRepository.find({
        where: {
          startDate: LessThan(currentDateString),
          endDate: MoreThan(currentDateString),
          departmentEndDate: MoreThan(currentDateString)
        },
        order: { [orderBy]: orderType }
      })
    } catch (error) {
      throw new Error('Error al recuperar las recopilaciones activas.')
    }
  }
}
