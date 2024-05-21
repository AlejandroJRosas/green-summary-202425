import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  view: string

  @IsNotEmpty()
  @IsString()
  creationDate: string

  @IsNotEmpty()
  @IsNumber()
  idUser: number
}
