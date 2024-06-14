import { IsInt, IsOptional, IsString } from 'class-validator'

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  helpText?: string

  @IsInt()
  @IsOptional()
  indicatorIndex?: number
}
