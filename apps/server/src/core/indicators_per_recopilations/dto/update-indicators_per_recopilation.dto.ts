import { PartialType } from '@nestjs/swagger'
import { CreateIndicatorsPerRecopilationDto } from './create-indicators_per_recopilation.dto'

export class UpdateIndicatorsPerRecopilationDto extends PartialType(
  CreateIndicatorsPerRecopilationDto
) {}
