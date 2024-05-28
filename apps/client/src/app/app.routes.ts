import { Routes } from '@angular/router'
import { LoginComponent } from './core/login/login.component'
import { NotFoundComponent } from './core/not-found/not-found.component'
import { HomeComponent } from './core/home/home.component'
import { authGuard } from './guards/auth.guard'
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component'
import { roleGuard } from './guards/role.guard'

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar Sesión',
    component: LoginComponent
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    canActivate: [authGuard, roleGuard(['admin'])]
  },
  {
    path: 'unauthorized',
    title: '401 Unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '**',
    title: '404 Not Found',
    component: NotFoundComponent
  }
]
