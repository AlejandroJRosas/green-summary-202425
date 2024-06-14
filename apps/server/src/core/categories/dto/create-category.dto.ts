import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  helpText: string

  @IsNumber()
  @IsNotEmpty()
  indicatorIndex: number
}
