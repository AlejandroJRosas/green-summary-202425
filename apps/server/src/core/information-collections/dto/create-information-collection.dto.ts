import { IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator'

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

  @MaxLength(280)
  @IsString()
  @IsNotEmpty()
  summary: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string
}
