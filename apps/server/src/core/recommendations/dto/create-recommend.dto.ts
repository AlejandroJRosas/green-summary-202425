import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateRecommendDto {
  @IsNotEmpty()
  @IsNumber()
  IDDepartamento: number

  @IsNotEmpty()
  @IsNumber()
  IDCategoria: number
}
