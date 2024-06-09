import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateRecommendationDto {
  @IsNumber()
  @IsNotEmpty()
  departmentPerRecopilationId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number
}
