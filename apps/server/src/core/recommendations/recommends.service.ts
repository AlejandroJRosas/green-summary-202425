import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Recommendation } from './entities/recommendation.entity'
import { CreateRecommendationDto } from './dto/create-recommendation.dto'
import { Category } from 'src/core/categories/entities/category.entity'
import { Department } from '../users/entities/department.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@Injectable()
export class RecommendService {
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
    const { departmentId, categoryId } = createRecommendationDto

    const department = await this.departmentsRepository.findOneByOrFail({
      id: departmentId
    })
    const category = await this.categoriesRepository.findOneByOrFail({
      id: categoryId
    })

    const recommendation = this.recommendationsRepository.create({
      department,
      category
    })

    return this.recommendationsRepository.save(recommendation)
  }

  async findAll({ page, itemsPerPage }: PaginationParams): Promise<{
    recommendations: Recommendation[]
    count: number
  }> {
    const [recommendations, count] =
      await this.recommendationsRepository.findAndCount({
        relations: ['departamento', 'categoria'],
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage
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
