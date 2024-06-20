import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateInformationCollectionDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @IsString()
  @IsNotEmpty()
  summary: string
}
