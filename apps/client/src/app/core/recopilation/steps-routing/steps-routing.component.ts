import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { StepsModule } from 'primeng/steps'

@Component({
  selector: 'app-steps-routing',
  standalone: true,
  imports: [RouterOutlet, StepsModule],
  templateUrl: './steps-routing.component.html',
  styles: ``
})
export class StepsRoutingComponent implements OnInit {
  items: MenuItem[] = []

  ngOnInit() {
    this.items = [
      {
        label: 'Crear Recopilacion',
        routerLink: 'informationRecopilation'
      },
      {
        label: 'Seleccionar departentos',
        routerLink: 'departments'
      },
      {
        label: 'Seleccionar indicadores, categorías y criterios ',
        routerLink: 'selectIndicatorsCategoriesCriteria'
      },
      {
        label: 'Recomendar categorías a criterios',
        routerLink: 'recommend'
      }
    ]
  }
}
