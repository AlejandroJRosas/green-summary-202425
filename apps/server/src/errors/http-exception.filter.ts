import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'
import { Response } from 'express'
import { constructHttpResponse } from 'src/shared/construct-http-response'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const exceptionResponse = exception.getResponse()

    const message =
      exceptionResponse['message'] ?? 'An unexpected error occurred'
    const statusCode = exception.getStatus()

    return response
      .status(statusCode)
      .json(constructHttpResponse(statusCode, exceptionResponse, message))
  }
}
