import { PartialType } from '@nestjs/swagger'
import { CreateCriteriaPerRecopilationDto } from './create-criteria_per_recopilation.dto'

export class UpdateCriteriaPerRecopilationDto extends PartialType(
  CreateCriteriaPerRecopilationDto
) {}
