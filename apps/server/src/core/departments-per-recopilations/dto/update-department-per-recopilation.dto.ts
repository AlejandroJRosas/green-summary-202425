import { PartialType } from '@nestjs/swagger'
import { CreateDepartmentPerRecopilationDto } from './create-department-per-recopilation.dto'

export class UpdateDepartmentPerRecopilationDto extends PartialType(
  CreateDepartmentPerRecopilationDto
) {}
