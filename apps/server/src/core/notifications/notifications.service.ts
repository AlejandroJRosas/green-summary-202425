import { Injectable } from '@nestjs/common'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'
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
    const user = await this.userRepository
      .findOneByOrFail({
        id: createNotificationDto.userId
      })
      .catch(() => {
        throw new Error(
          `No se encontró el usuario con ID ${createNotificationDto.userId}.`
        )
      })

    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      user: user
    })

    return this.notificationRepository.save(notification)
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
    try {
      return await this.notificationRepository.findOneOrFail({
        where: { id },
        relations: ['user']
      })
    } catch (error) {
      throw new Error(`No se encontró la notificación con ID ${id}.`)
    }
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto
  ): Promise<Notification> {
    await this.notificationRepository
      .update(id, updateNotificationDto)
      .catch(() => {
        throw new Error(`Error al actualizar la notificación con ID ${id}.`)
      })

    const notification = await this.notificationRepository
      .findOneOrFail({
        where: { id },
        relations: ['user']
      })
      .catch(() => {
        throw new Error(
          `No se encontró la notificación con ID ${id} después de la actualización.`
        )
      })

    return notification
  }

  async delete(id: number): Promise<void> {
    try {
      await this.notificationRepository.findOneByOrFail({ id })
      await this.notificationRepository.delete(id)
    } catch (error) {
      throw new Error(`Error al eliminar la notificación con ID ${id}.`)
    }
  }
}
