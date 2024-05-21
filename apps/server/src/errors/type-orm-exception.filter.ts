import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus
} from '@nestjs/common'
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
  TypeORMError
} from 'typeorm'
import { Response } from 'express'
import { constructHttpResponse } from 'src/shared/construct-http-response'

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  public catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let error: string
    let statusCode: number
    const message = exception.message

    switch (exception.constructor) {
      case EntityNotFoundError:
        error = 'Entity Not Found'
        statusCode = HttpStatus.NOT_FOUND
        break
      case QueryFailedError:
        error = 'Query Failed Error'
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY
        break
      case CannotCreateEntityIdMapError:
        error = 'Cannot Create Entity Id Map Error'
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY
        break
      default:
        error = 'Internal Server Error'
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR
        break
    }

    return response
      .status(statusCode)
      .json(constructHttpResponse(statusCode, error, message))
  }
}
