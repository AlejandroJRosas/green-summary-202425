import {
  IsString,
  IsOptional,
  IsNotEmpty,
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
  @MaxLength(VALUES.evidencesLinkMaxAmount)
  externalLink?: string

  @IsOptional()
  @IsString()
  fileLink?: string

  @IsNotEmpty()
  @IsNumberString()
  collectionId: number
}
