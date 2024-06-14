import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { USER_TYPES, UserType } from '../users.constants'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fullName: string

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  password: string

  @IsEnum(USER_TYPES)
  @IsNotEmpty()
  type: UserType
}
