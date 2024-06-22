import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsNumber
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
  @IsNumber()
  collectionId: number
}
