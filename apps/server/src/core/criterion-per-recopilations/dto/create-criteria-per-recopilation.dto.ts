import { IsNumber, IsNotEmpty } from 'class-validator'

export class CreateCriteriaPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  recopilationId: number

  @IsNotEmpty()
  @IsNumber()
  indicatorIndex: number

  @IsNotEmpty()
  @IsNumber()
  subIndex: number
}
