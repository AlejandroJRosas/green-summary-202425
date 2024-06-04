import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

export class RelateIndicatorsToRecopilationDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsNotEmpty()
  @Type(() => IndicatorToRelate)
  indicators: IndicatorToRelate[]
}

export class IndicatorToRelate {
  @IsNumber()
  @IsNotEmpty()
  indicatorId: number

  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsNotEmpty()
  @Type(() => CriteriaToRelate)
  criterion: CriteriaToRelate[]
}

export class CriteriaToRelate {
  @IsNumber()
  @IsNotEmpty()
  criteriaId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number
}
