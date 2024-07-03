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
import { VALUES } from 'shared/validations'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(VALUES.departmentFullNameMinAmount)
  @MaxLength(VALUES.departmentFullNameMaxAmount)
  fullName: string

  @IsEmail()
  @IsNotEmpty()
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.departmentEmailAmount)
  email: string

  @IsString()
  @IsOptional()
  @MaxLength(VALUES.departmentPasswordAmount)
  password: string

  @IsEnum(USER_TYPES)
  @IsNotEmpty()
  type: UserType
}
