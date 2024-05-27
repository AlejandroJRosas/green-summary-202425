import { Routes } from '@angular/router'
import { LoginComponent } from './core/login/LoginComponent'
import { DepartmentComponent } from './core/department/department.component'

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar Sesión',
    component: LoginComponent
  },
  {
    path: 'departments',
    title: 'Departamentos',
    component: DepartmentComponent
  }
]
