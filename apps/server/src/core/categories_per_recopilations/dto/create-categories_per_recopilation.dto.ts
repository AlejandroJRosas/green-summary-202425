import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateCategoriesPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  IDRecopilation: number

  @IsNotEmpty()
  @IsNumber()
  IDCategory: number
}
