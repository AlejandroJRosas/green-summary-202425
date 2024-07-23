import { Component, Inject, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute, Router } from '@angular/router'
import { Toast } from '../../../../../common/toast/toast.component'
import { ConfirmationService } from 'primeng/api'
import { DropdownModule } from 'primeng/dropdown'
import { ChipModule } from 'primeng/chip'
import { FormsModule } from '@angular/forms'
import { Department } from '../../../../../../shared/types/user.type'
import { Category } from '../../../../../../shared/types/category.type'
import {
  MatrixInfoDto,
  RecopilationService
} from '../../../../../services/recopilation.service'
import { ScrollTopModule } from 'primeng/scrolltop'
import { MatrixRecommendationsComponent } from './matrix/matrix.component'
import { TooltipModule } from 'primeng/tooltip'
import { DialogModule } from 'primeng/dialog'

@Component({
  selector: 'app-recommend-categories-department',
  standalone: true,
  imports: [
    ButtonModule,
    Toast,
    DropdownModule,
    ChipModule,
    FormsModule,
    ScrollTopModule,
    MatrixRecommendationsComponent,
    TooltipModule,
    DialogModule
  ],
  templateUrl: './recommend-categories-department.component.html',
  providers: [ConfirmationService]
})
export class RecommendCategoriesDepartmentComponent implements OnInit {
  recopilationId = -1
  departments: Department[] = []
  categories: Category[] = []
  selectedCategories: Category[] = []
  recommendationsFormValues: RecommendationFormValues[] = []
  matrixData: MatrixInfoDto | undefined
  dialogVisible: boolean = false
  dialogMatrixScrollHeight: string = 'calc(70vh - 1rem)'

  constructor(
    private router: Router,
    @Inject(Toast) private toast: Toast,
    private route: ActivatedRoute,
    private recopilationService: RecopilationService
  ) {
    this.route.params.subscribe((params) => {
      this.recopilationId = parseInt(params['recopilationId']) || -1
    })
  }

  ngOnInit() {
    this.getMatrixData()
  }

  getMatrixData() {
    if (this.recopilationId) {
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
  }

  preparePayload() {
    this.recommendationsFormValues = []

    this.matrixData?.departments.map((department) => {
      const filteredCategories = department.answers
        .map((answer) => {
          if (answer.isRecommended) {
            return {
              categoryId: answer.categoryId
            }
          }
          return null
        })
        .filter((category) => category !== null)

      if (filteredCategories.length > 0) {
        this.recommendationsFormValues.push({
          departmentId: department.department.id,
          categories: filteredCategories
        })
      }
    })
  }

  submitAndContinue() {
    if (this.matrixData?.isReady) {
      this.nextStep()
      return
    }

    this.preparePayload()

    const payload = {
      recopilationId: this.recopilationId,
      departments: this.recommendationsFormValues as {
        departmentId: number
        categories: { categoryId: number }[]
      }[]
    }

    this.recopilationService.recommendCategories(payload).subscribe({
      next: () => {
        this.nextStep()
        this.toast.show('success', 'Éxito', 'Categorías recomendadas con éxito')
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

  nextStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/preview/${this.recopilationId}`
    )
  }

  prevStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/select-indicators-categories-criteria/${this.recopilationId}`
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

export type RecommendationFormValues = {
  departmentId: number
  categories: ({ categoryId: number } | null)[]
}
