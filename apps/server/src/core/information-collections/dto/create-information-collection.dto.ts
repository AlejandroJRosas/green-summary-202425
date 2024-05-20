import { IsString, IsDateString, IsNotEmpty } from 'class-validator'

export class CreateInformationCollectionDto {
  @IsString()
  @IsNotEmpty()
  summary: string

  @IsDateString()
  @IsNotEmpty()
  creationDate: string
}
