import { Component, Inject, Input } from '@angular/core'
import { PanelModule } from 'primeng/panel'
import { Recopilation } from '../../../../shared/types/recopilation.type'
import { ButtonModule } from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip'
import { Router } from '@angular/router'
import { Toast } from '../../../common/toast/toast.component'
import { RecopilationService } from '../../../services/recopilation.service'
import { ConfirmationService } from 'primeng/api'

@Component({
  selector: 'app-recopilation-card',
  standalone: true,
  imports: [PanelModule, ButtonModule, TooltipModule],
  templateUrl: './recopilation-card.component.html',
  styleUrl: './recopilation-card.component.css'
})
export class RecopilationCardComponent {
  @Input() recopilation: Recopilation | undefined

  constructor(
    @Inject(Toast) private toast: Toast,
    private router: Router,
    private readonly recopilationService: RecopilationService,
    private readonly confirmationService: ConfirmationService
  ) {}

  navigateStepsCreate() {
    this.router.navigateByUrl(
      'pages/recopilations/steps-create/information-recopilation'
    )
  }

  navigateContinueSteps(id: number) {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/information-recopilation/${id}`
    )
  }

  navigateRecopilationDetails(id: number) {
    this.router.navigateByUrl(`pages/recopilations/steps-create/preview/${id}`)
  }

  confirmRecopilationDeletion(event: Event, id: number, name: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar el recopilación <strong>${name}</strong>?`,
      header: 'Eliminar recopilación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      accept: () => {
        this.toast.show('info', 'Eliminando..', 'Eliminando recopilación..')
        this.onDelete(id)
      }
    })
  }

  private onDelete(id: number) {
    this.recopilationService.delete(id).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Eliminado',
          'Recopilación eliminada con éxito'
        )
        // this.loadRecopilations()
      },
      error: (e) => {
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }

  parseDate(date: Date | undefined): string {
    if (date === undefined) {
      return ''
    }
    return new Date(date).toLocaleDateString('es-ES', {
      timeZone: 'UTC'
    })
  }
}
