import { PartialType } from '@nestjs/swagger'
import { CreateIndicatorPerRecopilationDto } from './create-indicator-per-recopilation.dto'

export class UpdateIndicatorPerRecopilationDto extends PartialType(
  CreateIndicatorPerRecopilationDto
) {}
