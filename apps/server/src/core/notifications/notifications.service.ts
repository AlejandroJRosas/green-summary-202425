import { Injectable } from '@nestjs/common'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { Notification } from './entities/notification.entity'
import { User } from '../users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-notifications-by-param.dto'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto
  ): Promise<Notification> {
    const user = await this.userRepository.findOneByOrFail({
      id: createNotificationDto.userId
    })

    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      user: user
    })

    return this.notificationRepository.save(notification)
  }

  async createAll(description: string): Promise<void> {
    const users = await this.userRepository.find({
      where: {
        type: 'coordinator'
      }
    })

    let notification
    users.forEach((user) => {
      notification = this.notificationRepository.create({
        description: description,
        user: user
      })
      this.notificationRepository.save(notification)
    })
  }

  async getAll({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [notifications, count] =
      await this.notificationRepository.findAndCount({
        relations: ['user'],
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { notifications, count }
  }

  async getOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOneOrFail({
      where: { id },
      relations: ['user']
    })

    return notification
  }

  async update(id: number): Promise<Notification> {
    const change = await this.notificationRepository.findOneOrFail({
      where: { id }
    })
    change.seen = true

    await this.notificationRepository.update(id, change)

    const notification = await this.notificationRepository.findOneOrFail({
      where: { id },
      relations: ['user']
    })

    return notification
  }

  async delete(id: number): Promise<void> {
    await this.notificationRepository.findOneByOrFail({ id })

    await this.notificationRepository.delete(id)
  }
}
