import { Routes } from '@angular/router'
import { LoginComponent } from './core/login/login.component'

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar Sesión',
    component: LoginComponent
  }
]
