import { IsNumber, IsNotEmpty } from 'class-validator'

export class CreateCriteriaPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  recopilationId: number

  @IsNotEmpty()
  @IsNumber()
  criteriaId: number
}
