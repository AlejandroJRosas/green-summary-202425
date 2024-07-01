import { Component, Inject, OnInit } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { StepsModule } from 'primeng/steps'
import { Router } from '@angular/router'
import { Toast } from '../../../common/toast/toast.component'

@Component({
  selector: 'app-steps-routing',
  standalone: true,
  imports: [RouterOutlet, RouterLink, StepsModule, ButtonModule],
  templateUrl: './steps-routing.component.html'
})
export class StepsRoutingComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(Toast) private toast: Toast
  ) {}
  items: MenuItem[] = []
  urlSteps = '/pages/recopilations/steps-create'

  ngOnInit() {
    this.items = [
      {
        label: 'Crear recopilación',
        routerLink: `${this.urlSteps}/information-recopilation`
      },
      {
        label: 'Seleccionar departamentos',
        routerLink: `${this.urlSteps}/select-departments`
      },
      {
        label: 'Seleccionar esquema y asociar',
        routerLink: `${this.urlSteps}/select-indicators-categories-criteria`
      },
      {
        label: 'Recomendar categorías a departamentos',
        routerLink: `${this.urlSteps}/recommend-categories-department`
      },
      {
        label: 'Previsualizar',
        routerLink: `${this.urlSteps}/preview`
      }
    ]
  }

  onFinishLater() {
    this.router.navigateByUrl('pages/recopilations')
    this.toast.show(
      'info',
      'Terminar Después',
      'Puedes terminar la recopilación en otro momento'
    )
  }
}
