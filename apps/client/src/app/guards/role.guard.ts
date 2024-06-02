import { CanActivateFn, Router } from '@angular/router'
import { AuthService, RoleType } from '../services/auth.service'
import { inject } from '@angular/core'

export const roleGuard =
  (roles: RoleType[]): CanActivateFn =>
  () => {
    const authService = inject(AuthService)
    const router = inject(Router)
    if (authService.isRole(roles)) {
      return true
    } else {
      const url = router.createUrlTree(['/unauthorized'])
      return url
    }
  }
