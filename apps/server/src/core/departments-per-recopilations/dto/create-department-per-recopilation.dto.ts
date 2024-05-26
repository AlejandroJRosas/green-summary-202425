import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateDepartmentPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  recopilationId: number

  @IsNotEmpty()
  @IsNumber()
  departmentId: number
}
