import { CommonModule } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SkeletonModule } from 'primeng/skeleton'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api'
import { DialogModule } from 'primeng/dialog'
import {
  CreateDepartmentPayload,
  DepartmentService,
  EditDepartmentPayload
} from '../../services/department.service'
import { InputTextModule } from 'primeng/inputtext'
import { Toast } from '../../common/toast/toast.component'
import { Department } from './department.type'

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    FormsModule,
    SkeletonModule,
    ConfirmDialogModule,
    Toast,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './department.component.html',
  providers: [ConfirmationService]
})
export class DepartmentComponent implements OnInit {
  constructor(
    @Inject(Toast) private toast: Toast,
    private confirmationService: ConfirmationService,
    private departmentService: DepartmentService
  ) {}

  isDeletingDepartments = false
  isFetchingDepartments = false
  visibleCreate: boolean = false
  visibleEdit: boolean = false

  message: string = ''
  departments: Department[] = []

  departmentCreate: CreateDepartmentPayload = {
    fullName: '',
    email: '',
    password: '123',
    type: 'department'
  }

  departmentEdit: EditDepartmentPayload = {
    id: 0,
    fullName: '',
    email: '',
    password: '123',
    type: 'department'
  }

  skeletons: object[] = new Array(5).fill({})

  ngOnInit() {
    this.isFetchingDepartments = true
    this.getAll()
  }

  showDialogCreate() {
    this.visibleCreate = true
  }
  showDialogEdit(department: EditDepartmentPayload) {
    this.visibleEdit = true
    this.departmentEdit = department
  }

  confirmationDelete(event: Event, id: number, name: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar el departamento <strong>${name}</strong>?`,
      header: 'Eliminar departamento',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.toast.show(
          'success',
          'Eliminado',
          'Departamento eliminado con éxito'
        )
        this.onDelete(id)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
  }

  getAll() {
    this.departmentService.getAll().subscribe({
      next: (res) => {
        this.isFetchingDepartments = false
        this.departments = res.data.items
      },
      error: (e) => {
        console.error(e)
        this.isFetchingDepartments = false
      }
    })
  }
  onCreate() {
    this.departmentService.create(this.departmentCreate).subscribe({
      next: () => {
        this.toast.show('success', 'Creado', 'Departamento creado con éxito')
        this.getAll()
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', 'Error creando departamento')
      }
    })
  }

  onEdit(id: number) {
    this.departmentService.edit(id, this.departmentEdit).subscribe({
      next: () => {
        this.toast.show('success', 'Editado', 'Departamento editado con éxito')
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', 'Error editando el departamento')
      }
    })
  }
  onDelete(id: number) {
    this.isDeletingDepartments = true
    this.departmentService.delete(id).subscribe({
      next: () => {
        this.departments = this.departments.filter(
          (department) => department.id !== id
        )
      },
      error: (e) => {
        console.error(e)
        this.isDeletingDepartments = false
      }
    })
  }
}
