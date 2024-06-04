import { IsNumber, IsNotEmpty } from 'class-validator'

export class CreateCategorizedCriteriaDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @IsNumber()
  @IsNotEmpty()
  criteriaId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number
}
