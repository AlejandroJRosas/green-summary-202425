import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { VALUES } from 'shared/validations'

export class UpdateIndicatorDto {
  @IsNumber()
  @IsOptional()
  index?: number

  @IsString()
  @IsOptional()
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.indicatorNameAliasMaxAmount)
  name?: string

  @IsString()
  @IsOptional()
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.indicatorNameAliasMaxAmount)
  alias?: string

  @IsString()
  @IsOptional()
  @MinLength(VALUES.helpTextMinAmount)
  @MaxLength(VALUES.helpTextMaxAmount)
  helpText?: string
}
