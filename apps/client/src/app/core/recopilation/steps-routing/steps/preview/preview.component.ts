import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TooltipModule } from 'primeng/tooltip'
import { Recopilation } from '../../../../../../shared/types/recopilation.type'
import { ReactiveFormsModule } from '@angular/forms'
import { Toast } from '../../../../../common/toast/toast.component'
import {
  DetailedRecopilation,
  RecopilationService
} from '../../../../../services/recopilation.service'
import { JsonPipe } from '@angular/common'

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
    JsonPipe
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

  recopilationData: DetailedRecopilation | null = null

  ngOnInit() {
    this.loadRecopilation()
  }

  loadRecopilation() {
    if (this.recopilationId !== -1) {
      this.recopilationService.getById(this.recopilationId).subscribe({
        next: (data) => {
          if (data) this.recopilationData = data
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
