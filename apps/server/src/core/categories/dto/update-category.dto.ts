import { IsInt, IsOptional, IsString } from 'class-validator'

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  textHelp?: string

  @IsInt()
  @IsOptional()
  idIndicator?: number
}
