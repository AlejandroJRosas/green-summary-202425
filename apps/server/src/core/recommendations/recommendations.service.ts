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
import { NotificationsService } from '../notifications/notifications.service'
import { MailsService } from '../mails/mails.service'
import { NOTIFICATION_TYPES } from '../notifications/notifications.constants'

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
    private readonly departmentsPerRecopilationsRepository: Repository<DepartmentPerRecopilation>,
    private notificationsService: NotificationsService,
    private mailsService: MailsService
  ) {}

  async create(
    createRecommendationDto: CreateRecommendationDto
  ): Promise<Recommendation> {
    const { recopilationId, departmentId, categoryId } = createRecommendationDto

    const [departmentPerRecopilation, category] = await Promise.all([
      this.departmentsPerRecopilationsRepository.findOneByOrFail({
        department: { id: departmentId },
        recopilation: { id: recopilationId }
      }),
      this.categoriesRepository.findOneByOrFail({
        id: categoryId
      })
    ])

    const recommendation = this.recommendationsRepository.create({
      departmentPerRecopilation,
      category
    })

    const notificationCategory =
      await this.categoriesRepository.findOneByOrFail({ id: categoryId })
    const data = {
      categoryId: notificationCategory.id,
      categoryName: notificationCategory.name
    }
    const notificationDTO = {
      data: data,
      type: NOTIFICATION_TYPES.RECOMMENDATION,
      userId: departmentId
    }
    await this.notificationsService.create(notificationDTO)

    const description = `Se te recomendó la categoría ${categoryId}`
    const department = await this.departmentsRepository.findOneByOrFail({
      id: departmentId
    })
    this.mailsService.sendNotification(department.email, description)

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
    return await this.recommendationsRepository.findOneOrFail({
      where: { id },
      relations: ['categoria', 'departmentPerRecopilation']
    })
  }

  async remove(id: number): Promise<void> {
    const recommend = await this.recommendationsRepository.findOneByOrFail({
      id
    })

    await this.recommendationsRepository.remove(recommend)
  }
}
