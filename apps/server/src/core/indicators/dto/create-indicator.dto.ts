import { IsNotEmpty, IsString } from 'class-validator'

export class CreateIndicatorDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  alias: string

  @IsString()
  @IsNotEmpty()
  helpText: string
}
