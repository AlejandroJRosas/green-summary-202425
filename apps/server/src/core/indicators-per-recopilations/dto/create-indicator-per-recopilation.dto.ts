import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateIndicatorPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  IDRecopilacion: number

  @IsNotEmpty()
  @IsNumber()
  IndiceIndicador: number
}
