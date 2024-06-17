import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { TreeModule } from 'primeng/tree'
import { recopilations } from '../recopilations.data'
import { Router } from '@angular/router'
import { CheckboxModule } from 'primeng/checkbox'
import { ReactiveFormsModule } from '@angular/forms'
import {
  Category,
  categoriesIndicator1,
  categoriesIndicator2
} from './categories.data'
import { data } from './data'

interface selectedData {
  key: string | number
  label: string
  data: string
  categories: Category[]
  children: Node[]
  type: string
  category: null | string
}
@Component({
  selector: 'app-select-indicators-categories-criteria',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    TreeModule,
    CheckboxModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './select-indicators-categories-criteria.component.html'
})
export class SelectIndicatorsCategoriesCriteriaComponent {
  constructor(private router: Router) {}
  recopilations = recopilations
  categoriesIndicator1 = categoriesIndicator1
  categoriesIndicator2 = categoriesIndicator2

  selectedData: selectedData[] = []
  data = data
  onSelectionChangeDropdown(category: string, keyCriteria: string) {
    const node = this.selectedData.find((file) => file.key === keyCriteria)
    if (node) {
      node.category = category
    }
  }

  nextStep() {
    this.router.navigateByUrl(
      'pages/recopilations/steps-create/recommend-categories-department'
    )
  }
  prevStep() {
    this.router.navigateByUrl(
      'pages/recopilations/steps-create/select-departments'
    )
  }
}
