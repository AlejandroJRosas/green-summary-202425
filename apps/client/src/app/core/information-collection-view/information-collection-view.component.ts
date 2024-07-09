import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  InformationCollectionByDepartment,
  InformationCollectionService
} from '../../services/information-collection.service'
import { Toast } from '../../common/toast/toast.component'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DividerModule } from 'primeng/divider'
import { ImageModule } from 'primeng/image'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { PanelModule } from 'primeng/panel'
import { Category } from '../../../shared/types/category.type'
import { Indicator } from '../../../shared/types/indicator.type'
import { CategoryService } from '../../services/category.service'
import { DepartmentService } from '../../services/department.service'
import { User } from '../../../shared/types/user.type'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ConfirmationService, MessageService } from 'primeng/api'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-information-collection-view',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ImageModule,
    DividerModule,
    ConfirmPopupModule,
    ReactiveFormsModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './information-collection-view.component.html',
  styles: ``
})
export class InformationCollectionViewComponent implements OnInit {
  constructor(
    @Inject(Toast) private toast: Toast,
    private route: ActivatedRoute,
    private InformationCollectionService: InformationCollectionService,
    private CategoryService: CategoryService,
    private router: Router,
    private DepartmentService: DepartmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
      this.departmentId = parseInt(params['departmentId'], 10)
    })
  }
  recopilationId: number = 0
  categoryId: number = 0
  departmentId: number = 0
  formGroup = new FormGroup({
    error: new FormControl('')
  })
  informationCollections: InformationCollectionByDepartment[] = []
  indicator: Indicator = {
    index: 0,
    alias: '',
    helpText: '',
    name: ''
  }
  category: Category = {
    name: '',
    helpText: '',
    id: 0,
    indicator: this.indicator
  }
  department: User = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    type: 'department'
  }
  ngOnInit() {
    this.getDepartmentById()
    this.getCategoryById()
    this.getAllByDepartment()
  }
  translateType(type: string) {
    switch (type) {
      case 'image':
        return 'Imagen'
      case 'document':
        return 'Documento'
      default:
        return 'Link'
    }
  }
  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Please confirm to proceed moving forward.',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Guardar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        this.toast.show('success', 'Guardando...', 'Guardando el error...')
      },
      reject: () => {
        this.toast.show(
          'error',
          'Rechazado',
          'Ha rechazado la subida del error'
        )
        this.formGroup.controls.error.setValue('')
      }
    })
  }
  getDepartmentById() {
    this.DepartmentService.getById(this.departmentId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.department = res.data
        }
      },
      error: (e) => {
        console.error(e)
        this.router.navigateByUrl('/404 Not Found')
      }
    })
  }
  getCategoryById() {
    this.CategoryService.getById(this.categoryId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.category = res.data
        }
      },
      error: (e) => {
        console.error(e)
        this.router.navigateByUrl('/404 Not Found')
      }
    })
  }
  getAllByDepartment() {
    this.InformationCollectionService.getByDepartmentId(
      this.recopilationId,
      this.categoryId,
      this.departmentId
    ).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.informationCollections = res.data
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
}
