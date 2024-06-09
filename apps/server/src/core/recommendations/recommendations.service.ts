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

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationsRepository: Repository<Recommendation>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>
  ) {}

  async create(
    createRecommendationDto: CreateRecommendationDto
  ): Promise<Recommendation> {
    const { departmentPerRecopilationId: departmentId, categoryId } =
      createRecommendationDto

    const department = await this.departmentsRepository.findOneByOrFail({
      id: departmentId
    })
    const category = await this.categoriesRepository.findOneByOrFail({
      id: categoryId
    })

    const recommendation = this.recommendationsRepository.create({
      departmentPerRecopilation: department,
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
        relations: ['departamento', 'categoria'],
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { recommendations, count }
  }

  async findOne(id: number): Promise<Recommendation> {
    return await this.recommendationsRepository.findOneOrFail({
      where: { id },
      relations: ['departamento', 'categoria']
    })
  }

  async remove(id: number): Promise<void> {
    const recommend = await this.recommendationsRepository.findOneByOrFail({
      id
    })

    await this.recommendationsRepository.remove(recommend)
  }
}
