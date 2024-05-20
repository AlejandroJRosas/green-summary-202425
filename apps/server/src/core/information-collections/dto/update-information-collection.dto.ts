import { PartialType } from '@nestjs/swagger'
import { CreateInformationCollectionDto } from './create-information-collection.dto'

export class UpdateInformationCollectionDto extends PartialType(
  CreateInformationCollectionDto
) {}
