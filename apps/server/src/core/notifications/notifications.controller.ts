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
  ValidationPipe,
  Query,
  HttpStatus
} from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'

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
  async getAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Res() response: Response
  ) {
    const { notifications, count } = await this.notificationsService.getAll({
      page,
      itemsPerPage
    })

    const paginatedItems = constructPaginatedItemsDto(
      notifications,
      count,
      page,
      itemsPerPage
    )
    return response.status(HttpStatus.OK).json(paginatedItems)
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() response: Response) {
    const notification = await this.notificationsService.getOne(Number(id))
    return response.status(HttpStatus.OK).json(notification)
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
