import { Component, Inject, QueryList, ViewChildren } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TooltipModule } from 'primeng/tooltip'
import { ReactiveFormsModule } from '@angular/forms'
import { Toast } from '../../../../../common/toast/toast.component'
import {
  MatrixInfoDto,
  RecopilationService
} from '../../../../../services/recopilation.service'
import { JsonPipe } from '@angular/common'
import { MatrixComponent } from '../../../../home/matrix/matrix.component'
import { Panel, PanelModule } from 'primeng/panel'
import { DialogModule } from 'primeng/dialog'
import { ScrollTopModule } from 'primeng/scrolltop'

@Component({
  selector: 'app-information-recopilation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    TooltipModule,
    Toast,
    JsonPipe,
    MatrixComponent,
    PanelModule,
    DialogModule,
    ScrollTopModule
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  @ViewChildren(Panel) panels: QueryList<Panel> | undefined

  allCollapsed: boolean = true

  //!DO NOT REMOVE THIS METHOD
  changed() {}

  collapseAll() {
    if (this.panels == null) return

    this.allCollapsed = true

    this.panels.forEach((panel) => {
      if (panel.collapsed) return

      panel.animating = true
      panel.collapse()
    })
  }

  expandAll() {
    if (this.panels == null) return

    this.allCollapsed = false

    this.panels.forEach((panel) => {
      if (!panel.collapsed) return

      panel.animating = true
      panel.expand()
    })
  }

  constructor(
    @Inject(Toast) private toast: Toast,
    private recopilationService: RecopilationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.recopilationId = parseInt(params['recopilationId'], 10) || -1
    })
  }

  recopilationId: number = -1
  matrixData: MatrixInfoDto | undefined
  dialogVisible: boolean = false
  dialogMatrixScrollHeight: string = 'calc(70vh - 1rem)'

  ngOnInit() {
    this.loadRecopilation()
  }

  loadRecopilation() {
    this.recopilationService.getMatrixInfo(this.recopilationId).subscribe({
      next: (recopilation) => {
        if (recopilation) {
          this.matrixData = recopilation
        }
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

  finishRecopilationCreation() {
    if (!this.matrixData?.isReady) {
      this.recopilationService.setAsReady(this.recopilationId).subscribe({
        next: () => {
          this.toast.show('success', 'Éxito', 'Recopilación creada con éxito')
          this.router.navigateByUrl('pages/recopilations')
        },
        error: (e) => {
          if (e.error.data != null) {
            this.toast.show('error', 'Error', e.error.data.message)
          } else {
            this.toast.show('error', 'Error', e.error.message)
          }
        }
      })
    } else {
      this.router.navigateByUrl('pages/recopilations')
    }
  }
  prevStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/recommend-categories-department/${this.recopilationId}`
    )
  }

  showDialog() {
    this.dialogMatrixScrollHeight = 'calc(70vh - 1rem)'
    this.dialogVisible = true
  }

  onMaximize() {
    if (this.dialogMatrixScrollHeight === 'calc(80vh - 1rem)') {
      this.dialogMatrixScrollHeight = 'calc(70vh - 1rem)'
    } else {
      this.dialogMatrixScrollHeight = 'calc(80vh - 1rem)'
    }
  }

  parseDate(date: string | undefined): string {
    if (date === undefined) {
      return ''
    }
    return new Date(date).toLocaleDateString('es-ES', {
      timeZone: 'UTC'
    })
  }
}
