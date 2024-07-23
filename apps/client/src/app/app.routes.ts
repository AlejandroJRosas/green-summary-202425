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
import { PreviewComponent } from './core/recopilation/steps-routing/steps/preview/preview.component'

import { UploadOfEvidenceComponent } from './core/upload-of-evidence/upload-of-evidence.component'
import { CreateEvidencesComponent } from './core/upload-of-evidence/collection-of-information/create/create-evidences.component'
import { EditEvidenceComponent } from './core/upload-of-evidence/collection-of-information/edit-evidence/edit-evidence.component'
import { InformationCollectionViewComponent } from './core/information-collection-view/information-collection-view.component'
import { RecordsComponent } from './core/records/records.component'
import { ViewNotificationsComponent } from './core/view-notifications/view-notifications.component'
import { StatisticsComponent } from './core/statistics/statistics.component'
import { RecopilationDetailsComponent } from './core/recopilation/recopilation-details/recopilation-details.component'

export const routes: Routes = [
  {
    path: '',
    title: 'Green Summary',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
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
        title: 'Inicio',
        component: HomeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'statistics',
        title: 'Inicio',
        component: StatisticsComponent,
        canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
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
        path: 'recopilations/:recopilationId',
        title: 'Detalle de recopilación',
        component: RecopilationDetailsComponent,
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
            path: 'information-recopilation/:recopilationId',
            title: 'Información de la recopilación',
            component: InformationRecopilationComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          },
          {
            path: 'select-departments/:recopilationId',
            title: 'Seleccionar departamentos',
            component: SelectDepartmentsComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          },
          {
            path: 'select-indicators-categories-criteria/:recopilationId',
            title: 'Seleccionar indicadores, categorías y criterios',
            component: SelectIndicatorsCategoriesCriteriaComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          },
          {
            path: 'recommend-categories-department/:recopilationId',
            title: 'Recomendar categorías a departamentos',
            component: RecommendCategoriesDepartmentComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          },
          {
            path: 'preview/:recopilationId',
            title: 'Previzualizar recopilación',
            component: PreviewComponent,
            canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
          }
        ]
      },
      {
        path: 'information-collection/recopilation/:recopilationId/category/:categoryId',
        title: 'Colecciones de información',
        component: UploadOfEvidenceComponent,
        canActivate: [roleGuard([Role.DEPARTMENT])]
      },
      {
        path: 'create/information-collection/recopilation/:recopilationId/category/:categoryId/information-collection/:informationCollectionId',
        title: 'Agregar evidencias',
        component: CreateEvidencesComponent,
        canActivate: [roleGuard([Role.DEPARTMENT])]
      },
      {
        path: 'edit/information-collection/recopilation/:recopilationId/category/:categoryId/information-collection/:informationCollectionId/evidence/:evidenceId',
        title: 'Agregar evidencias',
        component: EditEvidenceComponent,
        canActivate: [roleGuard([Role.DEPARTMENT])]
      },
      {
        path: 'view/information-collection/recopilation/:recopilationId/category/:categoryId/department/:departmentId',
        title: 'Colecciones de información',
        component: InformationCollectionViewComponent,
        canActivate: [roleGuard([Role.COORDINATOR, Role.ADMIN])]
      },
      {
        path: 'records',
        title: 'Registro de evidencias',
        component: RecordsComponent,
        canActivate: [authGuard, roleGuard([Role.ADMIN, Role.COORDINATOR])]
      },
      {
        path: 'notifications',
        title: 'Notificaciones',
        component: ViewNotificationsComponent,
        canActivate: [
          roleGuard([Role.COORDINATOR, Role.ADMIN, Role.DEPARTMENT])
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
