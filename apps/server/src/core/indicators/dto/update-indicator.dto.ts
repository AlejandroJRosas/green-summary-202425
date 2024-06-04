import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateIndicatorDto {
  @IsNumber()
  @IsOptional()
  index?: number

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
