import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { Router } from '@angular/router'
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-select-departments',
  standalone: true,
  imports: [ButtonModule, DropdownModule, CheckboxModule, FormsModule],
  templateUrl: './select-departments.component.html',
  styles: ``
})
export class SelectDepartmentsComponent {
  constructor(private router: Router) {}
  recopilations = [
    {
      id: 1,
      name: 'Recopilación 1'
    },
    {
      id: 2,
      name: 'Recopilación 2'
    },
    {
      id: 3,
      name: 'Recopilación 3'
    }
  ]
  departments = [
    {
      name: 'Departamento 1',
      key: 1
    },
    {
      name: 'Departamento 2',
      key: 2
    },
    {
      name: 'Departamento 3',
      key: 3
    },
    {
      name: 'Departamento 4',
      key: 4
    },
    {
      name: 'Departamento 5',
      key: 5
    },
    {
      name: 'Departamento 6',
      key: 6
    },
    {
      name: 'Departamento 7',
      key: 7
    },
    {
      name: 'Departamento 8',
      key: 8
    },
    {
      name: 'Departamento 9',
      key: 9
    },
    {
      name: 'Departamento 10',
      key: 10
    }
  ]
  selectedRecopilation = {}
  selectedDepartments = []
  test() {
    console.log(this.selectedRecopilation)
  }
  nextStep() {
    this.router.navigateByUrl('recopilations/steps-create/select-departments')
  }
}
