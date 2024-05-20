import { PartialType } from '@nestjs/mapped-types'
import { CreateCriterionDto } from './create-criterion.dto'

export class UpdateCriterionDto extends PartialType(CreateCriterionDto) {}
