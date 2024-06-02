import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateCategoryPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  IDRecopilation: number

  @IsNotEmpty()
  @IsNumber()
  IDCategory: number
}
