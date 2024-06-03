import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateDepartmentsPerRecopilationDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsNotEmpty()
  departmentsIds: number[]
}
