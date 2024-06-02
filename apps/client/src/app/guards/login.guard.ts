import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.isAuth()) {
    const url = router.createUrlTree(['/home'])
    return url
  } else {
    return true
  }
}
