import { IsNumber, IsString, IsBoolean } from 'class-validator'

export class CreateCriterionDto {
  @IsNumber()
  readonly indicatorIndex: number

  @IsString()
  readonly name: string

  @IsString()
  readonly alias: string

  @IsString()
  readonly helpText: string

  @IsBoolean()
  readonly requiresEvidence: boolean
}
