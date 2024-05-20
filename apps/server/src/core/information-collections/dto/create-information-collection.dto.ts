import { IsString, IsNotEmpty } from 'class-validator'

export class CreateInformationCollectionDto {
  @IsString()
  @IsNotEmpty()
  summary: string
}
