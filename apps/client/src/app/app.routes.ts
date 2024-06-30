import { Routes } from '@angular/router'
import { LoginComponent } from './core/login/login.component'
import { DepartmentComponent } from './core/department/department.component'
import { NotFoundComponent } from './core/not-found/not-found.component'
import { HomeComponent } from './core/home/home.component'
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component'
import { loginGuard } from './guards/login.guard'
import { authGuard } from './guards/auth.guard'
import { SchemeComponent } from './core/scheme/scheme.component'
import { LayoutComponent } from './common/layout/layout.component'
import { roleGuard } from './guards/role.guard'
import { Role } from './services/auth.service'
import { UploadOfEvidenceComponent } from './core/upload-of-evidence/upload-of-evidence.component'
import { CreateEvidencesComponent } from './core/upload-of-evidence/collection-of-information/create/create-evidences.component'
import { EditEvidenceComponent } from './core/upload-of-evidence/collection-of-information/edit-evidence/edit-evidence.component'
import { InformationCollectionViewComponent } from './core/information-collection-view/information-collection-view.component'

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
        path: 'information-collection/:recopilationId/:categoryId',
        title: 'Colecciones de información',
        component: UploadOfEvidenceComponent,
        canActivate: [roleGuard([Role.DEPARTMENT])]
      },
      {
        path: 'create/information-collection/:recopilationId/:categoryId/:informationCollectionId',
        title: 'Agregar evidencias',
        component: CreateEvidencesComponent,
        canActivate: [roleGuard([Role.DEPARTMENT])]
      },
      {
        path: 'edit/information-collection/:recopilationId/:categoryId/:informationCollectionId/:evidenceId',
        title: 'Agregar evidencias',
        component: EditEvidenceComponent,
        canActivate: [roleGuard([Role.DEPARTMENT])]
      },
      {
        path: 'view/information-collection/:recopilationId/:categoryId/:departmentId',
        title: 'Colecciones de información',
        component: InformationCollectionViewComponent,
        canActivate: [roleGuard([Role.COORDINATOR, Role.ADMIN])]
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
