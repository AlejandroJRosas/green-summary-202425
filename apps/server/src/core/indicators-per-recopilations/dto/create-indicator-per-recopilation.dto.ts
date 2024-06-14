import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateIndicatorPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  recopilationId: number

  @IsNotEmpty()
  @IsNumber()
  indicatorIndex: number
}
