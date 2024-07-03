import { CommonModule } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SkeletonModule } from 'primeng/skeleton'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api'
import { DialogModule } from 'primeng/dialog'
import {
  CreateUserDTO,
  DepartmentService
} from '../../services/department.service'
import { InputTextModule } from 'primeng/inputtext'
import { Toast } from '../../common/toast/toast.component'
import { User } from '../../../shared/types/user.type'
import { ValidatedFormGroup } from '../../common/validated-form-group/validated-form-group'
import { string, object } from 'yup'
import { VALUES } from '../../../../../../shared/validations'

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
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './department.component.html',
  providers: [ConfirmationService]
})
export class DepartmentComponent
  extends ValidatedFormGroup<IDepartmentComponent>
  implements OnInit
{
  errors = {
    fullName: '',
    email: ''
  }
  constructor(
    @Inject(Toast) private toast: Toast,
    private confirmationService: ConfirmationService,
    private departmentService: DepartmentService
  ) {
    const initialControlValues = {
      fullName: '',
      email: ''
    }

    const validationSchema = object({
      fullName: string()
        .required('El nombre completo es requerido')
        .max(
          VALUES.departmentFullNameMaxAmount,
          'El nombre no debe superar los 100 caracteres'
        )
        .min(
          VALUES.departmentFullNameMinAmount,
          'El nombre debe superar un mínimo de 4 caracteres'
        ),
      email: string()
        .required('El correo electrónico es requerido')
        .email('El correo electrónico no tiene un formato válido')
        .max(
          VALUES.departmentEmailAmount,
          'El correo electrónico no debe superar los 320 caracteres'
        )
    })

    super(initialControlValues, validationSchema)
  }

  isFetchingDepartments = false
  visibleCreate: boolean = false
  visibleEdit: boolean = false
  visibleViewInformation: boolean = false
  message: string = ''
  totalRecords: number = 0
  departments: User[] = []
  department: User = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    type: 'department'
  }
  departmentEdit: User = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    type: 'department'
  }
  paginated = {
    first: 0,
    rows: 5
  }
  header = `Departamento + ${this.department.fullName}`
  skeletons: object[] = new Array(5).fill({})

  ngOnInit() {
    this.isFetchingDepartments = true
    this.getAll()
  }

  closeDialog() {
    this.formGroup.reset()
    this.errors.fullName = ''
    this.errors.email = ''
  }

  showDialogCreate() {
    this.visibleCreate = true
  }
  showDialogViewInformation() {
    this.visibleViewInformation = true
  }
  showDialogEdit(department: User) {
    this.visibleEdit = true
    this.departmentEdit = department
    this.formGroup.setValue({
      fullName: department.fullName,
      email: department.email
    })
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
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      accept: () => {
        this.toast.show('info', 'Eliminando..', 'Eliminando departamento..')
        this.onDelete(id)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
  }

  getAll() {
    this.departmentService.getAll(this.paginated).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.departments = res.data.items
          this.totalRecords = res.data.totalItems
        }
        this.isFetchingDepartments = false
      },
      error: (e) => {
        console.error(e)
        this.isFetchingDepartments = false
      }
    })
  }
  loadPaginatedData(event: TableLazyLoadEvent) {
    this.paginated.first = event.first || 0
    this.getAll()
  }
  onCreate() {
    const { fullName, email } = this.formGroup.controls
    if (!fullName.value || !email.value) return
    const user: CreateUserDTO = {
      fullName: fullName.value,
      email: email.value.toLowerCase(),
      type: 'department'
    }
    this.visibleCreate = false
    this.departmentService.create(user).subscribe({
      next: (res) => {
        this.department = res.status === 'success' ? res.data : this.department
        this.toast.show('success', 'Creado', 'Departamento creado con éxito')
        this.showDialogViewInformation()
        this.getAll()
      },
      error: (e) => {
        this.visibleCreate = false
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  onEdit() {
    const { id, password, type } = this.departmentEdit
    const { fullName, email } = this.formGroup.controls
    if (!fullName.value || !email.value) return
    const user: User = {
      id: id,
      fullName: fullName.value,
      email: email.value.toLowerCase(),
      password: password,
      type: type
    }
    this.departmentService.edit(user.id, user).subscribe({
      next: () => {
        this.toast.show('success', 'Editado', 'Departamento editado con éxito')
        this.getAll()
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  onDelete(id: number) {
    this.departmentService.delete(id).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Eliminado',
          'Departamento eliminado con éxito'
        )
        this.departments = this.departments.filter(
          (department) => department.id !== id
        )
        this.getAll()
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
}
interface IDepartmentComponent {
  fullName: string
  email: string
}
