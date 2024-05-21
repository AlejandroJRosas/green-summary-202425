import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserTypes } from '../constants'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsEnum(UserTypes)
  @IsNotEmpty()
  type: UserTypes
}
