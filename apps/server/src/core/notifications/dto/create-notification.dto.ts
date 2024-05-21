import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateNotificationDto {
  @IsBoolean()
  @IsNotEmpty()
  seen: boolean

  @IsNotEmpty()
  @IsDateString()
  createdAt: string

  @IsNumber()
  @IsNotEmpty()
  userId: number
}
