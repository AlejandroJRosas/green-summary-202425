import { PartialType } from '@nestjs/mapped-types'
import { CreateCriteriaDto } from './create-criteria.dto'

export class UpdateCriteriaDto extends PartialType(CreateCriteriaDto) {}
