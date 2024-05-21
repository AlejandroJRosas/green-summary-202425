import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Recommendation } from './entities/recommendation.entity'
import { CreateRecommendationDto } from './dto/create-recommendation.dto'
import { Category } from 'src/core/categories/entities/category.entity'
import { Department } from '../users/entities/department.entity'

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

  findAll(): Promise<Recommendation[]> {
    return this.recommendationsRepository.find({
      relations: ['departamento', 'categoria']
    })
  }

  findOne(id: number): Promise<Recommendation> {
    return this.recommendationsRepository.findOneOrFail({
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
