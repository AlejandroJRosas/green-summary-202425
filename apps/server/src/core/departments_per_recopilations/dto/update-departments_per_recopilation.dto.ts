import { PartialType } from '@nestjs/swagger'
import { CreateDepartmentsPerRecopilationDto } from './create-departments_per_recopilation.dto'

export class UpdateDepartmentsPerRecopilationDto extends PartialType(
  CreateDepartmentsPerRecopilationDto
) {}
