import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateRecommendationDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number
}
