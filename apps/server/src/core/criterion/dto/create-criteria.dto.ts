import {
  IsNumber,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional
} from 'class-validator'

export class CreateCriteriaDto {
  @IsNumber()
  @IsOptional()
  indicatorIndex?: number

  @IsNumber()
  @IsNotEmpty()
  subIndex: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  alias: string

  @IsString()
  @IsNotEmpty()
  helpText: string

  @IsBoolean()
  @IsOptional()
  requiresEvidence?: boolean
}
