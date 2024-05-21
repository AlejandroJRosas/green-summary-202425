import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { Response as ExpressResponse } from 'express'
import { constructHttpResponse } from 'src/shared/construct-http-response'
import { HttpResponse } from 'src/shared/http-response.type'

@Injectable()
export class SuccessfulResponseBuilderInterceptor
  implements NestInterceptor<unknown, HttpResponse<unknown>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>
  ): Observable<HttpResponse<unknown>> {
    const response = context.switchToHttp().getResponse<ExpressResponse>()

    const statusCode = response.statusCode

    return next
      .handle()
      .pipe(map((data) => constructHttpResponse(statusCode, data)))
  }
}
