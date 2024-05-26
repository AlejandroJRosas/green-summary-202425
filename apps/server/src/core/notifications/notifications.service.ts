import { Injectable } from '@nestjs/common'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'
import { Notification } from './entities/notification.entity'
import { User } from '../users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

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

  async getAll({
    page,
    itemsPerPage
  }: PaginationParams): Promise<{
    notifications: Notification[]
    count: number
  }> {
    const [notifications, count] =
      await this.notificationRepository.findAndCount({
        relations: ['user'],
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage
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

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto
  ): Promise<Notification> {
    await this.notificationRepository.update(id, updateNotificationDto)

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
