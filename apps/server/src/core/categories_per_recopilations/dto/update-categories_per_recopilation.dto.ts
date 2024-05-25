import { PartialType } from '@nestjs/swagger'
import { CreateCategoriesPerRecopilationDto } from './create-categories_per_recopilation.dto'

export class UpdateCategoriesPerRecopilationDto extends PartialType(
  CreateCategoriesPerRecopilationDto
) {}
