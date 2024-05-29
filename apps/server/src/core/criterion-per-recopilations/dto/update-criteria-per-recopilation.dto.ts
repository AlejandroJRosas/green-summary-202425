import { PartialType } from '@nestjs/swagger'
import { CreateCriteriaPerRecopilationDto } from './create-criteria-per-recopilation.dto'

export class UpdateCriteriaPerRecopilationDto extends PartialType(
  CreateCriteriaPerRecopilationDto
) {}
