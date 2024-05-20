import {
  IsDateString,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt
} from 'class-validator'

export class CreateEvidenceDto {
  @IsDateString()
  @IsNotEmpty()
  uploadDate: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  error: string

  @IsString()
  @IsNotEmpty()
  type: string

  @IsOptional()
  @IsString()
  externalLink?: string

  @IsOptional()
  @IsString()
  fileLink?: string

  @IsNotEmpty()
  @IsInt()
  collectionId: number
}
