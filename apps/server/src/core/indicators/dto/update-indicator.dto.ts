import { IsOptional, IsString } from 'class-validator'

export class UpdateIndicatorDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  alias?: string

  @IsString()
  @IsOptional()
  textHelp?: string
}
