import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'
import { constructHttpResponse } from 'src/shared/construct-http-response'
import { ClassValidatorValidationsException } from './class-validator-validations.exception'
import { ValidationError } from 'class-validator'

@Catch(ClassValidatorValidationsException)
export class ClassValidatorValidationsExceptionFilter
  implements ExceptionFilter
{
  public catch(
    exception: ClassValidatorValidationsException,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json(
        constructHttpResponse(
          HttpStatus.BAD_REQUEST,
          formatErrors(exception.errors),
          'Validation error'
        )
      )
  }
}

function formatErrors(errors: ValidationError[]) {
  const formattedErrors = {}

  errors.forEach(
    (e) =>
      (formattedErrors[e.property] = Object.values(e.constraints).join(', '))
  )

  return formattedErrors
}
