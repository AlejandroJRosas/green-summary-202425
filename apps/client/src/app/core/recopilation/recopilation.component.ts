import { Component, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { Recopilation } from '../../../shared/types/recopilation.type'
import { RecopilationService } from '../../services/recopilation.service'
import { PanelModule } from 'primeng/panel'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api'
import { Toast } from '../../common/toast/toast.component'
import { DialogModule } from 'primeng/dialog'

@Component({
  selector: 'app-recopilation',
  standalone: true,
  imports: [ButtonModule, PanelModule, ConfirmDialogModule, DialogModule],
  providers: [ConfirmationService],
  templateUrl: './recopilation.component.html'
})
export class RecopilationComponent {
  constructor(
    private router: Router,
    private readonly recopilationService: RecopilationService,
    private readonly confirmationService: ConfirmationService,
    @Inject(Toast) private toast: Toast
  ) {}

  recopilations: Recopilation[] = []

  ngOnInit() {
    this.loadRecopilations()
  }

  private loadRecopilations() {
    this.recopilationService.getAll().subscribe((recopilations) => {
      this.recopilations = recopilations
    })
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
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
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
        this.loadRecopilations()
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }

  navigateStepsCreate() {
    this.router.navigateByUrl(
      'pages/recopilations/steps-create/information-recopilation'
    )
  }
}
