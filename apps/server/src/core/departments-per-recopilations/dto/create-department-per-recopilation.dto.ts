import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateDepartmentsPerRecopilationDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @IsNumber({}, { each: true })
  @ArrayNotEmpty({ message: 'departmentsIds should not be an empty array' })
  @IsArray()
  @IsNotEmpty()
  departmentsIds: number[]
}
