import { Routes } from '@angular/router'
import { LoginComponent } from './core/login/login.component'
import { DepartmentComponent } from './core/department/department.component'
import { NotFoundComponent } from './core/not-found/not-found.component'
import { HomeComponent } from './core/home/home.component'
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component'
import { loginGuard } from './guards/login.guard'
import { authGuard } from './guards/auth.guard'
import { LayoutComponent } from './common/layout/layout.component'
import { roleGuard } from './guards/role.guard'
import { Role } from './services/auth.service'

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar Sesión',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'pages',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'departments',
        title: 'Departamentos',
        component: DepartmentComponent,
        canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
      }
    ]
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
