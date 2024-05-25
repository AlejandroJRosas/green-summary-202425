import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateRecommendationDto {
  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number
}
