import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  Patch,
  Put,
  Req
} from '@nestjs/common'
import { RecopilationsService } from './recopilations.service'
import { CreateRecopilationDto } from './dto/create-recopilation.dto'
import { UpdateRecopilationDto } from './dto/update-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-recopilations-by-param.dto'
import { RelateIndicatorsToRecopilationDto } from './dto/relate-indicators-to-recopilation.dto'
import { RecommendCategoriesDto } from './dto/recommend-categories.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Recopilation } from './entities/recopilation.entity'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { MatrixChangedEvent } from './dto/matrix-changed.event'
import { MatrixChangedManyEvent } from './dto/matrix-changed-many.event'
import { NOTIFICATION_TYPES } from '../notifications/notifications.constants'
import { NotificationsService } from '../notifications/notifications.service'
import { Department } from '../users/entities/department.entity'
import { MailsService } from '../mails/mails.service'
import { constructRecommendationMail } from './recommendation-mail'
import { Category } from '../categories/entities/category.entity'
import { Recommendation } from '../recommendations/entities/recommendation.entity'

@ApiTags('Recopilations')
@Controller('recopilations')
export class RecopilationsController {
  constructor(
    private readonly recopilationsService: RecopilationsService,
    @InjectRepository(Recopilation)
    private readonly recopilationsRepository: Repository<Recopilation>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Recommendation)
    private readonly recommendationsRepository: Repository<Recommendation>,
    private readonly notificationsService: NotificationsService,
    private readonly mailsService: MailsService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { recopilation, count } = await this.recopilationsService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    const paginatedItems = constructPaginatedItemsDto(
      recopilation,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get('active')
  async findActive(
    @Req() request: Request,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto
  ) {
    let departmentId: number | undefined = undefined

    if (request['user'].type === 'department') {
      departmentId = request['user'].id
    }

    const activeRecopilations =
      await this.recopilationsService.getActiveRecopilations(
        {
          orderBy,
          orderType
        },
        departmentId
      )

    return activeRecopilations
  }

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const recopilation = await this.recopilationsService.findOne(+id)

    return recopilation
  }

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get(':id/detailed')
  async findOneDetailed(@Param('id') id: string) {
    const recopilation = await this.recopilationsService.findOneDetailed(+id)

    return recopilation
  }

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get(':id/matrix')
  async findOneMatrix(@Param('id') id: string) {
    const recopilation = await this.recopilationsService.findMatrix(+id)

    return recopilation
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() recopilationData: CreateRecopilationDto) {
    const createdRecopilation =
      await this.recopilationsService.create(recopilationData)

    this.eventEmitter.emit(
      'matrix.changed',
      new MatrixChangedEvent(createdRecopilation.id)
    )

    return createdRecopilation
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() recopilationData: UpdateRecopilationDto
  ) {
    const updatedRecopilation = await this.recopilationsService.update(
      +id,
      recopilationData
    )

    this.eventEmitter.emit('matrix.changed', new MatrixChangedEvent(Number(id)))

    return updatedRecopilation
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Put()
  async updateOrCreate(@Body() recopilationData: UpdateRecopilationDto) {
    if (!recopilationData.id) {
      const createdRecopilation = await this.recopilationsService.create(
        recopilationData as CreateRecopilationDto
      )

      this.eventEmitter.emit(
        'matrix.changed',
        new MatrixChangedEvent(createdRecopilation.id)
      )

      return createdRecopilation
    }

    const updatedRecopilation = await this.recopilationsService.update(
      recopilationData.id,
      recopilationData
    )

    this.eventEmitter.emit(
      'matrix.changed',
      new MatrixChangedEvent(updatedRecopilation.id)
    )

    return updatedRecopilation
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.recopilationsService.remove(+id)
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Put('relate-indicators')
  async relateIndicatorsToRecopilation(
    @Body() relateIndicatorsToRecopilationDto: RelateIndicatorsToRecopilationDto
  ) {
    try {
      const recopilation = await this.recopilationsService.relateToIndicators(
        relateIndicatorsToRecopilationDto
      )

      await this.eventEmitter.emitAsync(
        'matrix.changed',
        new MatrixChangedEvent(recopilation.id)
      )

      return recopilation
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Put('recommend-categories')
  async recommendCategoriesToDepartments(
    @Body() recommendCategoriesDto: RecommendCategoriesDto
  ) {
    const res = await this.recopilationsService.recommendCategories(
      recommendCategoriesDto
    )
    console.log('1')
    await this.eventEmitter.emitAsync(
      'matrix.changed',
      new MatrixChangedEvent(recommendCategoriesDto.recopilationId)
    )
    console.log('2')
    return res
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Patch(':id/set-as-ready')
  async setAsReady(@Param('id') id: string) {
    const recopilation = await this.recopilationsRepository.findOneByOrFail({
      id: +id
    })

    if (recopilation.isReady) {
      return recopilation
    }

    recopilation.isReady = true

    const updatedRecopilation =
      await this.recopilationsRepository.save(recopilation)

    this.eventEmitter.emit(
      'matrix.changed',
      new MatrixChangedEvent(recopilation.id)
    )

    const departmentsInRecopilation = await this.departmentsRepository.find({
      where: {}
    })

    await Promise.all(
      departmentsInRecopilation.map(async (d) => {
        const categories = await this.recommendationsRepository
          .find({
            where: {
              departmentPerRecopilation: {
                recopilation: {
                  id: recopilation.id,
                  departmentsPerRecopilation: {
                    department: {
                      id: d.id
                    }
                  }
                }
              }
            },
            relations: {
              category: true
            }
          })
          .then((recs) => recs.map((r) => r.category.id))

        if (categories.length > 0)
          this.notifyRecommendationToDepartment(
            d.id,
            recopilation.id,
            categories
          )
      })
    )

    return updatedRecopilation
  }

  private async notifyRecommendationToDepartment(
    departmentId: number,
    recopilationId: number,
    categoriesIds: number[]
  ) {
    const recopilation = await this.recopilationsService.findOne(recopilationId)

    const data = {
      recopilationId: recopilationId,
      recopilationName: recopilation.name,
      recommendationsQuantity: categoriesIds.length
    }

    const notificationDTO = {
      data: data,
      type: NOTIFICATION_TYPES.RECOMMENDATION,
      userId: departmentId
    }
    await this.notificationsService.create(notificationDTO)

    const { email: departmentEmail } =
      await this.departmentsRepository.findOneByOrFail({
        id: departmentId
      })

    const categories = await this.categoriesRepository.find({
      where: {
        id: In(categoriesIds)
      }
    })

    const emailBody = constructRecommendationMail(
      recopilation.name,
      recopilation.startDate,
      categories.map((c) => c.name)
    )

    this.mailsService.sendNotification(
      departmentEmail,
      'Has sido recomendado para aportar información',
      emailBody
    )
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Get(':id/statistics')
  async getRecopilationStats(@Param('id') id: string) {
    return this.recopilationsService.getRecopilationStatistics(+id)
  }

  @OnEvent('matrix.changed', { async: true, promisify: true })
  handleChangedMatrixEvent(payload: MatrixChangedEvent) {
    return this.recopilationsService.constructAndSaveMatrix(
      payload.recopilationId
    )
  }

  @OnEvent('matrix.changed.many')
  handleChangedManyMatrixEvent(payload: MatrixChangedManyEvent) {
    for (const recopilationId of payload.recopilationIds) {
      this.recopilationsService.constructAndSaveMatrix(recopilationId)
    }
  }
}
