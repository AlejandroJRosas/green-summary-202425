import { IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateDepartmentPerRecopilationDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @IsNumber()
  @IsNotEmpty()
  departmentsIds: number
}
