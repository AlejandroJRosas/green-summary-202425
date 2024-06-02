import { Component, OnInit } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { StepsModule } from 'primeng/steps'

@Component({
  selector: 'app-steps-routing',
  standalone: true,
  imports: [RouterOutlet, RouterLink, StepsModule],
  templateUrl: './steps-routing.component.html',
  styles: ``
})
export class StepsRoutingComponent implements OnInit {
  items: MenuItem[] = []
  urlSteps = '/recopilations/steps-create/'

  ngOnInit() {
    this.items = [
      {
        label: 'Crear Recopilación',
        routerLink: `${this.urlSteps}information-recopilation`
      },
      {
        label: 'Seleccionar departentos',
        routerLink: `${this.urlSteps}select-departments`
      },
      {
        label: 'Seleccionar indicadores, categorías y criterios ',
        routerLink: `${this.urlSteps}select-indicators-categories-criteria`
      },
      {
        label: 'Recomendar categorías a departamentos',
        routerLink: `${this.urlSteps}recommend-categories-criteria`
      }
    ]
  }
}
