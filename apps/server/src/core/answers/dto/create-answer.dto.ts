import { IsNumber, IsNotEmpty } from 'class-validator'

export class CreateAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @IsNumber()
  @IsNotEmpty()
  informationCollectionId: number
}
