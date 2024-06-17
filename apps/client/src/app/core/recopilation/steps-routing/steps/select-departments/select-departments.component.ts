import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { Router } from '@angular/router'
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox'
import { recopilations } from '../recopilations.data'
import { departments } from '../department.data'

@Component({
  selector: 'app-select-departments',
  standalone: true,
  imports: [ButtonModule, DropdownModule, CheckboxModule],
  templateUrl: './select-departments.component.html',
  styles: ``
})
export class SelectDepartmentsComponent {
  constructor(private router: Router) {}

  recopilations = recopilations
  departments = departments
  selectedRecopilation = {}
  selectedDepartments = []

  nextStep() {
    this.router.navigateByUrl(
      'pages/recopilations/steps-create/select-indicators-categories-criteria'
    )
  }
  prevStep() {
    this.router.navigateByUrl(
      'pages/recopilations/steps-create/information-recopilation'
    )
  }
}
