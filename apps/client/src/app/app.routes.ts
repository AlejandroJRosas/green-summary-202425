import { Routes } from '@angular/router'
import { LoginComponent } from './core/login/login.component'
import { NotFoundComponent } from './core/not-found/not-found.component'
// import { authGuard } from './guards/auth.guard'
// import { Role } from './services/auth.service'

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar Sesión',
    component: LoginComponent
  },
  {
    path: '**',
    title: '404 Not Found',
    component: NotFoundComponent
  }
]
