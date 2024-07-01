import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { VALUES } from 'shared/validations'

export class CreateIndicatorDto {
  @IsNumber()
  @IsNotEmpty()
  index: number

  @IsString()
  @IsNotEmpty()
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.indicatorNameAliasMaxAmount)
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.indicatorNameAliasMaxAmount)
  alias: string

  @IsString()
  @IsNotEmpty()
  @MinLength(VALUES.helpTextMinAmount)
  @MaxLength(VALUES.helpTextMaxAmount)
  helpText: string
}
