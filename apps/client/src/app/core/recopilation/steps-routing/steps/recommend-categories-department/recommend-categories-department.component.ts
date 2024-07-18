import { Component, Inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute, Router } from '@angular/router'
import { Toast } from '../../../../../common/toast/toast.component'
import { ConfirmationService } from 'primeng/api'
import { DropdownModule } from 'primeng/dropdown'
import { ChipModule } from 'primeng/chip'
import { FormsModule } from '@angular/forms'
import { CategorySelectorComponent } from './category-selector/category-selector.component'
import { Department } from '../../../../../../shared/types/user.type'
import { Category } from '../../../../../../shared/types/category.type'
import { RecopilationService } from '../../../../../services/recopilation.service'
import { ScrollTopModule } from 'primeng/scrolltop'

@Component({
  selector: 'app-recommend-categories-department',
  standalone: true,
  imports: [
    ButtonModule,
    Toast,
    DropdownModule,
    ChipModule,
    FormsModule,
    CategorySelectorComponent,
    ScrollTopModule
  ],
  templateUrl: './recommend-categories-department.component.html',
  providers: [ConfirmationService]
})
export class RecommendCategoriesDepartmentComponent {
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
  recopilationId = -1

  departments: Department[] = []
  categories: Category[] = []

  recommendationsFormValues: recommendationFormValues[] = []

  selectedCategories: Category[] = []

  ngOnInit() {
    this.loadDepartments()
    this.loadCategories()
    this.loadAlreadyInsertedRecommendations()
  }

  submitAndContinue() {
    const payload = this.adaptFormValuesToDto()
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

  private loadAlreadyInsertedRecommendations() {
    this.recopilationService.getById(this.recopilationId).subscribe({
      next: (recopilation) => {
        if (!recopilation) return

        if (Array.isArray(recopilation.departments)) {
          this.recommendationsFormValues = recopilation.departments.map(
            (d) => ({
              departmentId: d.department.id,
              categories: d.recommendedCategories
            })
          )
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

  private loadDepartments() {
    this.recopilationService
      .getSelectedDepartments(this.recopilationId)
      .subscribe({
        next: (departments) => {
          this.departments = departments
          departments.forEach((department) =>
            this.recommendationsFormValues.push({
              departmentId: department.id,
              categories: []
            })
          )
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

  private loadCategories() {
    this.recopilationService.getCategories(this.recopilationId).subscribe({
      next: (categories) => {
        this.categories = categories
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

  private adaptFormValuesToDto() {
    return {
      recopilationId: this.recopilationId,
      departments: this.recommendationsFormValues
        .filter((rfv) => rfv.categories.length > 0)
        .map((rfv) => ({
          departmentId: rfv.departmentId,
          categories: rfv.categories.map((category) => ({
            categoryId: category.id
          }))
        }))
    }
  }

  getCategoriesArray(departmentId: number) {
    return this.recommendationsFormValues.find(
      (recommendation) => recommendation.departmentId === departmentId
    )?.categories as []
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
}

type recommendationFormValues = {
  departmentId: number
  categories: Category[]
}
