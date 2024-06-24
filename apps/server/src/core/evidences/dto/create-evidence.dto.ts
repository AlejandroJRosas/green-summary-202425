import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsEnum,
  MaxLength,
  MinLength,
  IsNumberString
} from 'class-validator'
import { EvidenceType } from '../evidences.constants'
import { VALUES } from 'shared/validations'

export class CreateEvidenceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(VALUES.descriptionMinAmount)
  @MaxLength(VALUES.descriptionMaxAmount)
  description: string

  @IsString()
  @IsOptional()
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
  fileLink?: string

  @IsNotEmpty()
  @IsNumberString()
  collectionId: number
}
