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

@Component({
  selector: 'app-recommend-categories-department',
  standalone: true,
  imports: [
    ButtonModule,
    Toast,
    DropdownModule,
    ChipModule,
    FormsModule,
    CategorySelectorComponent
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

  selectedCategories: Category[] = []

  ngOnInit() {
    this.loadDepartments()
    this.loadCategories()
  }

  private loadDepartments() {
    this.recopilationService
      .getSelectedDepartments(this.recopilationId)
      .subscribe({
        next: (departments) => {
          this.departments = departments
        }
      })
  }

  private loadCategories() {
    this.recopilationService.getCategories(this.recopilationId).subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }

  nextStep() {
    this.router.navigateByUrl('pages/recopilations')
    this.toast.show('success', 'Éxito', 'Recopilación creada con éxito')
  }

  prevStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/select-indicators-categories-criteria/${this.recopilationId}`
    )
  }
}
