import { IsNumber, IsNotEmpty } from 'class-validator'

export class CreateCategorizedCriteriaDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @IsNumber()
  @IsNotEmpty()
  indicatorIndex: number

  @IsNumber()
  @IsNotEmpty()
  subIndex: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number
}
