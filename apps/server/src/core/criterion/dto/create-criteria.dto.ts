import {
  IsNumber,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength
} from 'class-validator'
import { VALUES } from 'shared/validations'

export class CreateCriteriaDto {
  @IsNumber()
  @IsOptional()
  indicatorIndex?: number

  @IsNumber()
  @IsNotEmpty()
  subIndex: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.criterionNameAliasMaxAmount)
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.criterionNameAliasMaxAmount)
  alias: string

  @IsString()
  @IsNotEmpty()
  @MinLength(VALUES.helpTextMinAmount)
  @MaxLength(VALUES.helpTextMaxAmount)
  helpText: string

  @IsBoolean()
  @IsOptional()
  requiresEvidence?: boolean
}
