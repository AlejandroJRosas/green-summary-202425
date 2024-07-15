import { IsEnum, IsNotEmpty, IsNumber, IsObject } from 'class-validator'
import {
  NOTIFICATION_TYPES,
  NotificationType
} from '../notifications.constants'

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsObject()
  data: object

  @IsNotEmpty()
  @IsEnum(NOTIFICATION_TYPES)
  type: NotificationType

  @IsNumber()
  @IsNotEmpty()
  userId: number
}
