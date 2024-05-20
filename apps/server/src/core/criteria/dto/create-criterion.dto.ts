import {
  IsNumber,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional
} from 'class-validator'

export class CreateCriterionDto {
  @IsNumber()
  @IsNotEmpty()
  indicatorIndex: number

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
