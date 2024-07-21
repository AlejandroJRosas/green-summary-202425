import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  EntityNotFoundError,
  Equal,
  In,
  LessThanOrEqual,
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
import { InformationCollection } from '../information-collections/entities/information-collection.entity'
import { Evidence } from '../evidences/entities/evidence.entity'
import { EvidenceType } from '../evidences/evidences.constants'

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
    private departmentsPerRecopilationsRepository: Repository<DepartmentPerRecopilation>,
    @InjectRepository(InformationCollection)
    private informationCollectionsRepository: Repository<InformationCollection>,
    @InjectRepository(Evidence)
    private evidencesRepository: Repository<Evidence>
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
      relations: [
        'departmentsPerRecopilation.department',
        'departmentsPerRecopilation.recommendations.category',
        'categorizedCriterion.criteria.indicator',
        'categorizedCriterion.category',
        'indicatorsPerRecopilations.indicator'
      ],
      withDeleted: true
    })

    const recommendations = recopilation.departmentsPerRecopilation.map(
      (dpr) => ({
        department: dpr.department,
        recommendedCategories: dpr.recommendations.map((r) => r.category)
      })
    )

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
      return {
        indicator,
        criteria: categorizedCriteria
      }
    })

    const recopilationDto: RecopilationDto = {
      id: recopilation.id,
      name: recopilation.name,
      description: recopilation.description,
      startDate: recopilation.startDate,
      endDate: recopilation.endDate,
      departmentEndDate: recopilation.departmentEndDate,
      isReady: recopilation.isReady,
      departments: recommendations,
      indicators: indicators
    }

    return recopilationDto
  }

  async findMatrix(id: number): Promise<MatrixInfoDto> {
    const recopilation = await this.recopilationsRepository.findOneOrFail({
      where: { id },
      select: { id: true, cachedMatrix: true }
    })

    if (!recopilation.cachedMatrix) {
      return this.constructAndSaveMatrix(id)
    }

    try {
      const matrix = JSON.parse(recopilation.cachedMatrix) as MatrixInfoDto

      return matrix
    } catch (e) {
      return this.constructAndSaveMatrix(id)
    }
  }

  async constructAndSaveMatrix(id: number) {
    const matrix = await this.constructMatrix(id)

    await this.recopilationsRepository.update(id, {
      cachedMatrix: JSON.stringify(matrix)
    })

    return matrix
  }

  private async constructMatrix(id: number) {
    const recopilation = await this.recopilationsRepository.findOneOrFail({
      where: { id },
      withDeleted: true,
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
          department: {
            fullName: 'ASC'
          },
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
      .sort((a, b) => a.id - b.id) as Category[]

    const departments = await Promise.all(
      recopilation.departmentsPerRecopilation.map(async (dpr) => ({
        department: dpr.department,
        answers: await Promise.all(
          allCategories.map(async (c) => {
            const isRecommended = dpr.recommendations?.some(
              (r) => r.category.id === c.id
            )

            const informationCollections = await this.getDepartmentAnswer(
              recopilation.id,
              c.id,
              dpr.department.id
            )

            const isAnswered =
              informationCollections.filter((ic) => !ic.isApproved).length > 0

            const isApproved =
              isAnswered && informationCollections.every((ic) => ic.isApproved)

            let hasError = false
            informationCollections.forEach((ic) => {
              if (ic.evidences?.some((e) => e.error !== null)) hasError = true
            })

            return {
              categoryId: c.id,
              isRecommended,
              isAnswered,
              isApproved,
              hasError
            }
          })
        )
      }))
    )

    const recopilationDto: MatrixInfoDto = {
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

  async getRecopilationStatistics(recopilationId: number) {
    const [
      categoriesQuantity,
      departmentsQuantity,
      answersQuantity,
      collectionsQuantity,
      imageEvidencesQuantity,
      documentEvidencesQuantity,
      linkEvidencesQuantity,
      departmentsRanking,
      mostAnswersCategory,
      leastAnswersCategory,
      matrix
    ] = await Promise.all([
      this.categorizedCriteriaRepository
        .createQueryBuilder()
        .select('COUNT(DISTINCT "categoryId")')
        .where({ recopilation: { id: recopilationId } })
        .execute()
        .then((res) => +res[0].count),
      this.departmentsPerRecopilationsRepository
        .createQueryBuilder()
        .where({ recopilation: { id: recopilationId } })
        .getCount(),
      this.informationCollectionsRepository
        .query(
          `
            SELECT COUNT(*) 
            FROM (SELECT DISTINCT "departmentId", "categoryId"
                  FROM information_collections
                  WHERE "recopilationId" = $1
                  ) AS internalQuery
        `,
          [recopilationId]
        )
        .then((res) => +res[0].count),
      this.informationCollectionsRepository.count({
        where: { recopilation: { id: recopilationId } }
      }),
      this.evidencesRepository.count({
        where: {
          collection: { recopilation: { id: recopilationId } },
          type: Equal('image' as EvidenceType)
        }
      }),
      this.evidencesRepository.count({
        where: {
          collection: { recopilation: { id: recopilationId } },
          type: Equal('document' as EvidenceType)
        }
      }),
      this.evidencesRepository.count({
        where: {
          collection: { recopilation: { id: recopilationId } },
          type: Equal('link' as EvidenceType)
        }
      }),
      this.departmentsRepository
        .query(
          `
          SELECT "departmentId" as id, d."fullName", d.email, d.password, COUNT(*) as count 
          FROM (SELECT DISTINCT "departmentId", "categoryId"
                FROM information_collections
                WHERE "recopilationId" = $1
                ) AS ic
          INNER JOIN users d ON ic."departmentId" = d.id 
          GROUP BY ic."departmentId", d."fullName", d.email, d.password
          ORDER BY count DESC
      `,
          [recopilationId]
        )
        .then((res) => {
          return res.map((row) => {
            const { count, ...resWithoutCount } = row
            return { department: resWithoutCount, answersQuantity: +count }
          })
        }),
      this.departmentsRepository
        .query(
          `
          SELECT "categoryId" as id, c.name, c."helpText", COUNT(*) as count
          FROM (SELECT DISTINCT "departmentId", "categoryId"
                FROM information_collections
                WHERE "recopilationId" = $1
                ) AS ic
          INNER JOIN categories c ON ic."categoryId" = c.id 
          GROUP BY "categoryId", c.name, c."helpText" 
          ORDER BY count DESC
          LIMIT 1
      `,
          [recopilationId]
        )
        .then((res) => {
          return res.map((row) => {
            const { count, ...resWithoutCount } = row
            return { category: resWithoutCount, answersQuantity: +count }
          })[0]
        }),
      this.departmentsRepository
        .query(
          `
          SELECT "categoryId" as id, c.name, c."helpText", COUNT(*) as count
          FROM (SELECT DISTINCT "departmentId", "categoryId"
                FROM information_collections
                WHERE "recopilationId" = $1
                ) AS ic
          INNER JOIN categories c ON ic."categoryId" = c.id 
          GROUP BY "categoryId", c.name, c."helpText" 
          ORDER BY count ASC
          LIMIT 1
      `,
          [recopilationId]
        )
        .then((res) => {
          return res.map((row) => {
            const { count, ...resWithoutCount } = row
            return { category: resWithoutCount, answersQuantity: +count }
          })[0]
        }),
      this.findMatrix(recopilationId)
    ])

    return {
      quantities: {
        categories: categoriesQuantity,
        departments: departmentsQuantity,
        answers: answersQuantity,
        collections: collectionsQuantity,
        evidences: {
          images: imageEvidencesQuantity,
          documents: documentEvidencesQuantity,
          links: linkEvidencesQuantity
        }
      },
      departmentsRanking,
      mostAnswersCategory,
      leastAnswersCategory,
      matrix
    }
  }

  private async getDepartmentAnswer(
    recopilationId: number,
    categoryId: number,
    departmentId: number
  ) {
    const informationCollections =
      await this.informationCollectionsRepository.find({
        where: {
          recopilation: { id: recopilationId },
          category: { id: categoryId },
          department: { id: departmentId }
        },
        relations: {
          evidences: true
        },
        order: {
          createdAt: 'DESC',
          evidences: {
            createdAt: 'DESC'
          }
        }
      })

    return informationCollections
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
        relations: ['categories', 'criterion'],
        withDeleted: true
      })

      for (const c of i.criterion) {
        const [criteria, category] = await Promise.all([
          this.criterionRepository.findOneOrFail({
            where: { id: c.criteriaId },
            withDeleted: true
          }),
          this.categoriesRepository.findOneOrFail({
            where: { id: c.categoryId },
            withDeleted: true
          })
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
          recopilation: { id: recopilationId }
        }
      }
    })

    await this.recommendationRepository.remove(oldRecommendations)

    return await this.recommendationRepository.save(recommendations)
  }

  async getActiveRecopilations(
    { orderBy, orderType }: OrderByParamDto & OrderTypeParamDto,
    departmentId: number | undefined
  ) {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    if (departmentId === undefined) {
      return this.recopilationsRepository.find({
        where: {
          startDate: LessThanOrEqual(currentDate),
          endDate: MoreThan(currentDate),
          isReady: Equal(true)
        },
        order: { [orderBy]: orderType }
      })
    }

    return this.recopilationsRepository.find({
      where: {
        startDate: LessThanOrEqual(currentDate),
        endDate: MoreThan(currentDate),
        departmentEndDate: MoreThan(currentDate),
        isReady: Equal(true),
        departmentsPerRecopilation: {
          department: { id: departmentId }
        }
      },
      order: { [orderBy]: orderType }
    })
  }
}

export type MatrixInfoDto = {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  departmentEndDate: Date
  isReady: boolean
  indicators: {
    index: number
    name: string
    alias: string
    helpText: string
    categories: {
      id: number
      name: string
      helpText: string
      criteria: {
        id: number
        subIndex: number
        name: string
        alias: string
        helpText: string
        requiresEvidence: boolean
      }[]
    }[]
  }[]
  departments: {
    department: Pick<Department, 'id' | 'fullName' | 'email' | 'type'>
    answers: Answer[]
  }[]
}

export interface Answer {
  categoryId: number
  isRecommended: boolean
  isAnswered: boolean
  isApproved: boolean
  hasError: boolean
}
