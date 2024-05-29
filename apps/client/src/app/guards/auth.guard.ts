import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'
import { Toast } from '../common/toast/toast.component'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.isAuth()) {
    return true
  } else {
    const url = router.createUrlTree(['/login'])
    const toast = inject(Toast)
    toast.show('error', 'Error', '¡Ups, parece que no has iniciado sesión aún!')
    return url
  }
}
