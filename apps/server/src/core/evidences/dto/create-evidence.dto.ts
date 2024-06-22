import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsNumberString
} from 'class-validator'
import { EvidenceType } from '../evidences.constants'

export class CreateEvidenceDto {
  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsOptional()
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
  @IsNumberString()
  collectionId: number
}
