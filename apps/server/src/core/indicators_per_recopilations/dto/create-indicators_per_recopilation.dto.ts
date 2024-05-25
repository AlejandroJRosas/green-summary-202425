import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateIndicatorsPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  IDRecopilacion: number

  @IsNotEmpty()
  @IsNumber()
  IndiceIndicador: number
}
