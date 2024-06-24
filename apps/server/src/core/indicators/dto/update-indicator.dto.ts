import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateIndicatorDto {
  @IsNumber()
  @IsOptional()
  index?: number

  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string

  @IsString()
  @IsOptional()
  @MaxLength(255)
  alias?: string

  @IsString()
  @IsOptional()
  helpText?: string
}
