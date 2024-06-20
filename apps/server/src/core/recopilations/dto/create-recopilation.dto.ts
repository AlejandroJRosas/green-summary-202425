import {
  IsNotEmpty,
  IsString,
  IsDateString,
  MaxLength,
  ValidateIf
} from 'class-validator'
import { isAfter, parseISO } from 'date-fns'

export class CreateRecopilationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsDateString()
  startDate: string // Nota: Usamos string aquí para IsDateString, y luego parseamos en la lógica de validación

  @IsNotEmpty()
  @IsDateString()
  @ValidateIf((o: CreateRecopilationDto) =>
    isAfter(parseISO(o.departmentEndDate), new Date())
  ) // La fecha debe ser posterior a la actual
  departmentEndDate: string

  @IsNotEmpty()
  @IsDateString()
  @ValidateIf((o: CreateRecopilationDto) =>
    isAfter(parseISO(o.endDate), new Date())
  ) // La fecha debe ser posterior a la actual
  endDate: string

  // Custom validation logic
  @ValidateIf((o: CreateRecopilationDto) =>
    isAfter(parseISO(o.departmentEndDate), parseISO(o.startDate))
  )
  @ValidateIf((o: CreateRecopilationDto) =>
    isAfter(parseISO(o.endDate), parseISO(o.startDate))
  )
  validateDates() {
    if (!isAfter(parseISO(this.departmentEndDate), parseISO(this.startDate))) {
      throw new Error('departmentEndDate must be after startDate')
    }
    if (!isAfter(parseISO(this.endDate), parseISO(this.startDate))) {
      throw new Error('endDate must be after startDate')
    }
  }
}
