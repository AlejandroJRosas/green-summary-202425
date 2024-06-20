import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string

  @IsNotEmpty()
  @IsString()
  helpText: string

  @IsNumber()
  @IsNotEmpty()
  indicatorIndex: number
}
