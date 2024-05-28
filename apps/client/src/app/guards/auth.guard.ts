import { CanActivateFn } from '@angular/router'
import { AuthService, RoleType } from '../services/auth.service'
import { inject } from '@angular/core'

export const authGuard =
  (roles: RoleType[]): CanActivateFn =>
  (route, state) => {
    const authService = inject(AuthService)
    return authService.isAuth(roles)
  }
