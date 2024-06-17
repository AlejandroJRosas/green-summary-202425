import { HttpInterceptorFn } from '@angular/common/http'

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') ?? ''
  const requestWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })
  return next(requestWithHeader)
}
