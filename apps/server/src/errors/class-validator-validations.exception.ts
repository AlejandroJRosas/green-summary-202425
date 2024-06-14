import { ValidationError } from 'class-validator'

export class ClassValidatorValidationsException extends Error {
  public errors: ValidationError[]

  constructor(errors: ValidationError[]) {
    super()
    this.errors = errors
  }
}
