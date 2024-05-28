import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { USER_TYPES, UserType } from '../constants'

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

  @IsEnum(USER_TYPES)
  @IsNotEmpty()
  type: UserType
}
