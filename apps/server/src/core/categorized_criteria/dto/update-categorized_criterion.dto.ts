import { PartialType } from '@nestjs/swagger'
import { CreateCategorizedCriteriaDto } from './create-categorized_criterion.dto'

export class UpdateCategorizedCriterionDto extends PartialType(
  CreateCategorizedCriteriaDto
) {}
