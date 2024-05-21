// create-recopilation.dto.ts

import { IsNotEmpty, IsString, IsDateString } from 'class-validator'

export class CreateRecopilationDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsDateString()
  startDate: Date

  @IsNotEmpty()
  @IsDateString()
  departmentEndDate: Date

  @IsNotEmpty()
  @IsDateString()
  endDate: Date
}
