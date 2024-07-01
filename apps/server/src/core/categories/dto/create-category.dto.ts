import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { VALUES } from 'shared/validations'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.categoryNameMaxAmount)
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(VALUES.helpTextMinAmount)
  @MaxLength(VALUES.helpTextMaxAmount)
  helpText: string

  @IsNumber()
  @IsNotEmpty()
  indicatorIndex: number
}
