import { Injectable } from '@nestjs/common'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'
import { Notification } from './entities/notification.entity'
import { User } from '../users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
      id: createNotificationDto.idUser
    })

    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      user: user
    })

    return this.notificationRepository.save(notification)
  }

  async getAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ relations: ['user'] })
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
