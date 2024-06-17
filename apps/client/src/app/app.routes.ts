import { Routes } from '@angular/router'

import { Role } from './services/auth.service'
import { loginGuard } from './guards/login.guard'
import { authGuard } from './guards/auth.guard'
import { roleGuard } from './guards/role.guard'

import { LayoutComponent } from './common/layout/layout.component'
import { NotFoundComponent } from './core/not-found/not-found.component'
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component'

import { LoginComponent } from './core/login/login.component'

import { HomeComponent } from './core/home/home.component'

import { DepartmentComponent } from './core/department/department.component'

import { SchemeComponent } from './core/scheme/scheme.component'

import { RecopilationComponent } from './core/recopilation/recopilation.component'
import { StepsRoutingComponent } from './core/recopilation/steps-routing/steps-routing.component'
import { InformationRecopilationComponent } from './core/recopilation/steps-routing/steps/information-recopilation/information-recopilation.component'
import { SelectDepartmentsComponent } from './core/recopilation/steps-routing/steps/select-departments/select-departments.component'
import { SelectIndicatorsCategoriesCriteriaComponent } from './core/recopilation/steps-routing/steps/select-indicators-categories-criteria/select-indicators-categories-criteria.component'
import { RecommendCategoriesDepartmentComponent } from './core/recopilation/steps-routing/steps/recommend-categories-department/recommend-categories-department.component'

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
      },
      {
        path: 'schemes',
        title: 'Esquemas',
        component: SchemeComponent,
        canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
      },
      {
        path: 'recopilations',
        title: 'Recopilaciones',
        component: RecopilationComponent,
        canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
      },
      {
        path: 'recopilations/steps-create',
        title: 'Pasos para crear una recopilación',
        component: StepsRoutingComponent,
        canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])],
        children: [
          {
            path: 'information-recopilation',
            title: 'Información de la recopilación',
            component: InformationRecopilationComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          },
          {
            path: 'select-departments',
            title: 'Seleccionar departamentos',
            component: SelectDepartmentsComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          },
          {
            path: 'select-indicators-categories-criteria',
            title: 'Seleccionar indicadores, categorías y criterios',
            component: SelectIndicatorsCategoriesCriteriaComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          },
          {
            path: 'recommend-categories-department',
            title: 'Recomendar categorías a departamentos',
            component: RecommendCategoriesDepartmentComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          }
        ]
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
