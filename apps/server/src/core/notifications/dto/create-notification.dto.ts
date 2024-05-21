import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  view: string

  @IsNotEmpty()
  @IsDateString()
  createdAt: string

  @IsNotEmpty()
  @IsNumber()
  idUser: number
}
