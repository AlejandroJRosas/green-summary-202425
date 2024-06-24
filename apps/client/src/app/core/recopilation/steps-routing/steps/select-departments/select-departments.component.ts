import { Component, Inject, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute, Router } from '@angular/router'
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox'
import { recopilations } from '../recopilations.data'
import { DepartmentService } from '../../../../../services/department.service'
import { User } from '../../../../../../shared/types/user.type'
import { RecopilationService } from '../../../../../services/recopilation.service'
import { FormsModule } from '@angular/forms'
import { Toast } from '../../../../../common/toast/toast.component'

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
      this.recopilationId = parseInt(params['recopilationId'], 10)
    })
  }

  recopilationId: number = 0

  recopilations = recopilations
  departments: User[] = []
  selectedDepartments = []

  ngOnInit() {
    this.loadDepartments()
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (response) => {
        this.departments = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  submitAndContinue() {
    const payload = {
      recopilationId: this.recopilationId,
      departmentsIds: this.selectedDepartments
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
