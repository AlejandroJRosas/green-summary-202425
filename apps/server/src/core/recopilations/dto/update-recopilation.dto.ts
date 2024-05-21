import { PartialType } from '@nestjs/swagger'
import { CreateRecopilationDto } from './create-recopilation.dto'

export class UpdateRecopilationDto extends PartialType(CreateRecopilationDto) {}
