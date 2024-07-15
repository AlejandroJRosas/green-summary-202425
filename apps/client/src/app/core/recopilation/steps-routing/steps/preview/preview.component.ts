import { Component, Inject } from '@angular/core'
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
    MatrixComponent
  ],
  templateUrl: './preview.component.html'
})
export class PreviewComponent {
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

  ngOnInit() {
    this.loadRecopilation()
  }

  loadRecopilation() {
    if (this.recopilationId) {
      this.recopilationService.getMatrixInfo(this.recopilationId).subscribe({
        next: (recopilation) => {
          if (recopilation) {
            this.matrixData = recopilation
          }
          console.log(this.matrixData)
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }

  finishRecopilationCreation() {
    this.recopilationService.setAsReady(this.recopilationId).subscribe({
      next: () => {
        this.toast.show('success', 'Éxito', 'Recopilación creada con éxito')
        this.router.navigateByUrl('pages/recopilations')
      }
    })
  }
  prevStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/recommend-categories-department/${this.recopilationId}`
    )
  }
}
