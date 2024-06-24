import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
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

  @MinLength(3)
  @MaxLength(255)
  @IsString()
  @IsOptional()
  password: string

  @IsEnum(USER_TYPES)
  @IsNotEmpty()
  type: UserType
}
