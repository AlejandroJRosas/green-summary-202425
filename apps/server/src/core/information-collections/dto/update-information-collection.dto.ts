import { PartialType } from '@nestjs/swagger'
import { CreateInformationCollectionDto } from './create-information-collection.dto'
import { IsBooleanString, IsOptional } from 'class-validator'

export class UpdateInformationCollectionDto extends PartialType(
  CreateInformationCollectionDto
) {
  @IsBoolean()
  @IsOptional()
  isApproved: boolean
}
