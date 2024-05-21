import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
    @Res() response: Response
  ) {
    const createdNotification = await this.notificationsService.create(
      createNotificationDto
    )
    return response.json(createdNotification)
  }

  @Get()
  async getAll(@Res() response: Response) {
    const notifications = await this.notificationsService.getAll()
    return response.json(notifications)
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() response: Response) {
    const notification = await this.notificationsService.getOne(Number(id))
    return response.json(notification)
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Res() response: Response
  ) {
    const notification = await this.notificationsService.update(
      Number(id),
      updateNotificationDto
    )
    return response.json(notification)
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    await this.notificationsService.delete(Number(id))
    return response.status(204).send()
  }
}
