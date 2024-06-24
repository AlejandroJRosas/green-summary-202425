import { PartialType } from '@nestjs/swagger'
import { CreateRecopilationDto } from './create-recopilation.dto'
import { IsInt, IsOptional } from 'class-validator'

export class UpdateRecopilationDto extends PartialType(CreateRecopilationDto) {
  @IsInt()
  @IsOptional()
  id: number
}
