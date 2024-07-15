import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  description: string

  @IsNumber()
  @IsNotEmpty()
  userId: number
}
