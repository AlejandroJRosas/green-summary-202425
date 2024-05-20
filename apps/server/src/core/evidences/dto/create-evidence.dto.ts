import {
  IsDateString,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsEnum
} from 'class-validator'
import { EvidenceType } from '../constants'

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

  @IsEnum(EvidenceType)
  @IsNotEmpty()
  type: EvidenceType

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
