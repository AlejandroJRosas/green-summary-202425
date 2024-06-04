import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateIndicatorDto {
  @IsNumber()
  @IsNotEmpty()
  index: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  alias: string

  @IsString()
  @IsNotEmpty()
  textHelp: string
}
