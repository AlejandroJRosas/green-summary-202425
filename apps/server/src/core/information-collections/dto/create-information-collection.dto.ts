import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength
} from 'class-validator'
import { VALUES } from 'shared/validations'

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
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.informationCollectionsSummary)
  summary: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string
}
