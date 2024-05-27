import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SkeletonModule } from 'primeng/skeleton'
import { Department } from './department.type'
import { DepartmentService } from '../../services/department.service'

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    FormsModule,
    SkeletonModule
  ],
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
  constructor(private departmentService: DepartmentService) {}

  isDeletingDepartments = false
  isFetchingDepartments = false

  departments: Department[] | string[] = []

  selectedDepartment!: Department

  onDelete(id: number) {
    this.isDeletingDepartments = true
    this.departmentService.delete(id).subscribe({
      next: (res) => {
        console.log(res)
        // this.departments = this.departments.filter(
        //   (department) => department.id !== id
        // )
        this.isDeletingDepartments = false
      },
      error: (e) => {
        console.error(e)
        this.isDeletingDepartments = false
      }
    })
  }

  ngOnInit() {
    this.departments = Array(8).map(() => 'xd')
    this.isFetchingDepartments = true
    this.departmentService.getAll().subscribe({
      next: (res) => {
        // console.log(res);
        this.departments = res.data.items
        this.isFetchingDepartments = false
      },
      error: (e) => {
        console.error(e)
        this.isFetchingDepartments = false
      }
    })
  }
}
