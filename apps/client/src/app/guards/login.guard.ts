import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { Toast } from '../common/toast/toast.component'

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.isAuth()) {
    const url = router.createUrlTree(['/home'])
    return url
  } else {
    const url = router.createUrlTree(['/login'])
    const toast = inject(Toast)
    toast.show('error', 'Error', '¡Ups, parece que no has iniciado sesión aún!')
    return url
  }
}
