import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export class CreateIndicatorDto {
  @IsNumber()
  @IsNotEmpty()
  index: number

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  alias: string

  @IsString()
  @IsNotEmpty()
  helpText: string
}
