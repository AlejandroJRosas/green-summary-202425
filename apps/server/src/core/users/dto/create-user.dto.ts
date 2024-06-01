import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { USER_TYPES, UserType } from '../users.constants'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  password?: string

  @IsEnum(USER_TYPES)
  @IsNotEmpty()
  type: UserType
}
