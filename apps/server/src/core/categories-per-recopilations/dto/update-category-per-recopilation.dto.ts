import { PartialType } from '@nestjs/swagger'
import { CreateCategoryPerRecopilationDto } from './create-category-per-recopilation.dto'

export class UpdateCategoryPerRecopilationDto extends PartialType(
  CreateCategoryPerRecopilationDto
) {}
