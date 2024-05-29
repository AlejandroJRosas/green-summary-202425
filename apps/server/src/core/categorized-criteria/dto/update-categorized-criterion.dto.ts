import { PartialType } from '@nestjs/swagger'
import { CreateCategorizedCriteriaDto } from './create-categorized-criterion.dto'

export class UpdateCategorizedCriterionDto extends PartialType(
  CreateCategorizedCriteriaDto
) {}
