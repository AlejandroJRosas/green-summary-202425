import { HttpStatus } from '@nestjs/common'
import { HttpResponse } from './http-response.type'

export function constructHttpResponse<T>(
  statusCode: HttpStatus,
  data: T,
  message?: string
): HttpResponse<T> {
  if (statusCode >= 200 && statusCode < 400) {
    return {
      status: 'success',
      data
    }
  }

  if (statusCode >= 400 && statusCode < 500) {
    return {
      status: 'fail',
      data
    }
  }

  return {
    status: 'error',
    message: message ?? 'An unexpected error occurred',
    data
  }
}
