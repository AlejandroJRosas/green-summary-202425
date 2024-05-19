import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  textHelp: string

  @IsNumber()
  @IsNotEmpty()
  idIndicator: number
}
