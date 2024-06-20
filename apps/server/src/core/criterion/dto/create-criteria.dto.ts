import {
  IsNumber,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength
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
  @MaxLength(255)
  name: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(7)
  alias: string

  @IsString()
  @IsNotEmpty()
  helpText: string

  @IsBoolean()
  @IsOptional()
  requiresEvidence?: boolean
}
