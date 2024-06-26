import { Component, Inject, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute, Router } from '@angular/router'
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox'
import { DepartmentService } from '../../../../../services/department.service'
import { Department } from '../../../../../../shared/types/user.type'
import { RecopilationService } from '../../../../../services/recopilation.service'
import { FormsModule } from '@angular/forms'
import { Toast } from '../../../../../common/toast/toast.component'
import { Recopilation } from '../../../../../../shared/types/recopilation.type'

@Component({
  selector: 'app-select-departments',
  standalone: true,
  imports: [FormsModule, ButtonModule, DropdownModule, CheckboxModule],
  templateUrl: './select-departments.component.html',
  styles: ``
})
export class SelectDepartmentsComponent implements OnInit {
  constructor(
    @Inject(Toast) private toast: Toast,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private recopilationService: RecopilationService
  ) {
    this.route.params.subscribe((params) => {
      this.recopilationId = parseInt(params['recopilationId']) || -1
    })
  }

  recopilationId: number = -1

  recopilations: Recopilation[] = []

  departments: Department[] = []
  selectedDepartmentsIds: number[] = []

  ngOnInit() {
    console.log(this.recopilationId)
    this.loadDepartmentsList()
    this.loadPreviousSelectedDepartments()
  }

  loadDepartmentsList() {
    this.departmentService.getAll().subscribe({
      next: (response) => {
        this.departments = response
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  loadPreviousSelectedDepartments() {
    this.recopilationService
      .getSelectedDepartments(this.recopilationId)
      .subscribe({
        next: (departments) => {
          console.log(departments)
          this.selectedDepartmentsIds = departments.map((d) => d.id)
        }
      })
  }

  submitAndContinue() {
    const payload = {
      recopilationId: this.recopilationId,
      departmentsIds: this.selectedDepartmentsIds
    }
    this.recopilationService.relateDepartments(payload).subscribe({
      next: (response) => {
        console.log(response)
        this.toast.show(
          'success',
          'Éxito',
          'Departamentos agregados correctamente'
        )
        this.nextStep()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  nextStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/select-indicators-categories-criteria/${this.recopilationId}`
    )
  }
  prevStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/information-recopilation/${this.recopilationId}`
    )
  }
}
