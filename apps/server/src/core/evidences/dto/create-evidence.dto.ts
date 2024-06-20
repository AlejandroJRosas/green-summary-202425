import {
  IsDateString,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsEnum,
  MaxLength,
  MinLength
} from 'class-validator'
import { EvidenceType } from '../evidences.constants'
import { VALUES } from 'shared/validations'

export class CreateEvidenceDto {
  @IsDateString()
  @IsNotEmpty()
  uploadDate: string

  @IsString()
  @IsNotEmpty()
  @MinLength(VALUES.descriptionMinAmount)
  @MaxLength(VALUES.descriptionMaxAmount)
  description: string

  @IsString()
  @IsNotEmpty()
  error: string

  @IsEnum(EvidenceType)
  @IsNotEmpty()
  type: EvidenceType

  @IsOptional()
  @IsString()
  @MinLength(VALUES.evidencesLinkMinAmount)
  @MaxLength(VALUES.evidencesLinkMaxAmount)
  externalLink?: string

  @IsOptional()
  @IsString()
  @MinLength(VALUES.evidencesLinkMinAmount)
  @MaxLength(VALUES.evidencesLinkMaxAmount)
  fileLink?: string

  @IsNotEmpty()
  @IsInt()
  collectionId: number
}
