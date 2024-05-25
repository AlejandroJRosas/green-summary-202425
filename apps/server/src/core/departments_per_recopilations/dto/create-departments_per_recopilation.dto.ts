import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateDepartmentsPerRecopilationDto {
  @IsNotEmpty()
  @IsNumber()
  recopilationId: number

  @IsNotEmpty()
  @IsNumber()
  departmentId: number
}
