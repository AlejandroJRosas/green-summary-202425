import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Recommendation } from './entities/recommendation.entity'
import { CreateRecommendationDto } from './dto/create-recommendation.dto'
import { Category } from 'src/core/categories/entities/category.entity'
import { Department } from '../users/entities/department.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-recommendations-by-param.dto'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationsRepository: Repository<Recommendation>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Recopilation)
    private readonly recopilationsRepository: Repository<Recopilation>,
    @InjectRepository(DepartmentPerRecopilation)
    private readonly departmentsPerRecopilationsRepository: Repository<DepartmentPerRecopilation>
  ) {}

  async create(
    createRecommendationDto: CreateRecommendationDto
  ): Promise<Recommendation> {
    const { recopilationId, departmentId, categoryId } = createRecommendationDto

    const [departmentPerRecopilation, category] = await Promise.all([
      this.departmentsPerRecopilationsRepository
        .findOneByOrFail({
          department: { id: departmentId },
          recopilation: { id: recopilationId }
        })
        .catch(() => {
          throw new Error(
            `No se encontró la combinación de departamento con ID ${departmentId} y recopilación con ID ${recopilationId}.`
          )
        }),
      this.categoriesRepository
        .findOneByOrFail({
          id: categoryId
        })
        .catch(() => {
          throw new Error(`No se encontró la categoría con ID ${categoryId}.`)
        })
    ])

    const recommendation = this.recommendationsRepository.create({
      departmentPerRecopilation,
      category
    })

    return this.recommendationsRepository.save(recommendation)
  }

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
    const [recommendations, count] =
      await this.recommendationsRepository.findAndCount({
        relations: ['category', 'departmentPerRecopilation'],
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { recommendations, count }
  }

  async findOne(id: number): Promise<Recommendation> {
    try {
      return await this.recommendationsRepository.findOneOrFail({
        where: { id },
        relations: ['category', 'departmentPerRecopilation']
      })
    } catch (error) {
      throw new Error(`No se encontró la recomendación con ID ${id}.`)
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const recommend = await this.recommendationsRepository.findOneByOrFail({
        id
      })
      await this.recommendationsRepository.remove(recommend)
    } catch (error) {
      throw new Error(
        `No se encontró la recomendación con ID ${id} para eliminar.`
      )
    }
  }
}
