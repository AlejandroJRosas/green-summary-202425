import {
  IsNotEmpty,
  IsString,
  IsDateString,
  MaxLength,
  ValidateIf,
  MinLength
} from 'class-validator'
import { isAfter, parseISO } from 'date-fns'
import { VALUES } from 'shared/validations'

export class CreateRecopilationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(VALUES.nameAliasMinAmount)
  @MaxLength(VALUES.recopilationsNameMaxAmount)
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(VALUES.descriptionMinAmount)
  @MaxLength(VALUES.descriptionMaxAmount)
  description: string

  @IsNotEmpty()
  @IsDateString()
  startDate: string // Nota: Usamos string aquí para IsDateString, y luego parseamos en la lógica de validación

  @IsNotEmpty()
  @IsDateString()
  /*  @ValidateIf((o: CreateRecopilationDto) =>
    isAfter(parseISO(o.departmentEndDate), new Date())
  ) // La fecha debe ser posterior a la actual */
  departmentEndDate: string

  @IsNotEmpty()
  @IsDateString()
  /*   @ValidateIf((o: CreateRecopilationDto) =>
    isAfter(parseISO(o.endDate), new Date())
  ) // La fecha debe ser posterior a la actual */
  endDate: string

  /*   // Custom validation logic
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
  } */
}
