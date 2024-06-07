import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  HttpStatus,
  Patch
} from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'
import { ApiTags } from '@nestjs/swagger'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-notifications-by-param.dto'

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const createdNotification = await this.notificationsService.create(
      createNotificationDto
    )
    return createdNotification
  }

  @Get()
  async getAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { notifications, count } = await this.notificationsService.getAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    const paginatedItems = constructPaginatedItemsDto(
      notifications,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    const notification = await this.notificationsService.getOne(Number(id))
    return notification
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    const notification = await this.notificationsService.update(
      Number(id),
      updateNotificationDto
    )
    return notification
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.notificationsService.delete(Number(id))
  }
}
