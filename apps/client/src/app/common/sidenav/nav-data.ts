import { Role } from '../../services/auth.service'

const BASE_LAYOUT_ROUTE = '/pages'

export const navbarData = [
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    routeLink: `${BASE_LAYOUT_ROUTE}/home`,
    visibility: [Role.ADMIN, Role.COORDINATOR, Role.DEPARTMENT]
  },
  {
    label: 'Notificaciones',
    icon: 'pi pi-bell',
    routeLink: `${BASE_LAYOUT_ROUTE}/notifications`,
    visibility: [Role.COORDINATOR, Role.DEPARTMENT]
  },
  {
    label: 'Estadísticas',
    icon: 'pi pi-chart-bar',
    routeLink: `${BASE_LAYOUT_ROUTE}/statistics`,
    visibility: [Role.ADMIN, Role.COORDINATOR]
  },
  {
    label: 'Departamentos',
    icon: 'pi pi-building',
    routeLink: `${BASE_LAYOUT_ROUTE}/departments`,
    visibility: [Role.ADMIN, Role.COORDINATOR]
  },
  {
    label: 'Esquemas',
    icon: 'pi pi-sitemap',
    routeLink: `${BASE_LAYOUT_ROUTE}/schemes`,
    visibility: [Role.ADMIN, Role.COORDINATOR]
  },
  {
    label: 'Recopilaciones',
    icon: 'pi pi-copy',
    routeLink: `${BASE_LAYOUT_ROUTE}/recopilations`,
    visibility: [Role.ADMIN, Role.COORDINATOR]
  },
  {
    label: 'Registros',
    icon: 'pi pi-file-word',
    routeLink: `${BASE_LAYOUT_ROUTE}/records`,
    visibility: [Role.ADMIN, Role.COORDINATOR]
  }
]
