import { Component, Inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { Router } from '@angular/router'
import { Toast } from '../../../../../common/toast/toast.component'
import { ConfirmationService } from 'primeng/api'
import { departments } from '../department.data'
import { DropdownModule } from 'primeng/dropdown'
import { ChipModule } from 'primeng/chip'
import { FormsModule } from '@angular/forms'
import { CategorySelectorComponent } from './category-selector/category-selector.component'
import { categoriesTotal } from './categoriesTotal.data'

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
    @Inject(Toast) private toast: Toast
  ) {}
  departments = departments
  categories = categoriesTotal
  nextStep() {
    this.router.navigateByUrl('pages/recopilations')
    this.toast.show('success', 'Éxito', 'Recopilación creada con éxito')
  }
  prevStep() {
    this.router.navigateByUrl(
      'pages/recopilations/steps-create/select-indicators-categories-criteria'
    )
  }
}
