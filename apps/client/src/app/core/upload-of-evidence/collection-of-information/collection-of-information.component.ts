import { Component, Inject, Input, OnInit } from '@angular/core'
import { PanelModule } from 'primeng/panel'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfirmationService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../common/validated-form-group/validated-form-group'
import { string, object } from 'yup'
import { InputTextModule } from 'primeng/inputtext'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import {
  InformationCollectionDTO,
  InformationCollectionService
} from '../../../services/information-collection.service'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { Toast } from '../../../common/toast/toast.component'
import { InformationCollection } from '../../../../shared/types/information-collection.type'
import { Category } from '../../../../shared/types/category.type'
import { Indicator } from '../../../../shared/types/indicator.type'

@Component({
  selector: 'collection-of-information',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    ConfirmDialogModule
  ],
  templateUrl: './collection-of-information.component.html',
  styles: ``
})
export class CollectionOfInformationComponent
  extends ValidatedFormGroup<FormValues>
  implements OnInit
{
  constructor(
    @Inject(Toast) private toast: Toast,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private InformationCollectionService: InformationCollectionService
  ) {
    const initialControlValues = {
      name: '',
      summary: ''
    }
    const validationSchema = object({
      summary: string().required('La descripción es requerida'),
      name: string().required('El nombre es requerido')
    })
    super(initialControlValues, validationSchema)
  }
  errors = {
    name: '',
    summary: ''
  }
  paginated = {
    first: 0,
    rows: 100
  }
  informationCollections: InformationCollection[] = []
  indicator: Indicator = {
    index: 0,
    alias: '',
    helpText: '',
    name: ''
  }
  @Input() category: Category = {
    name: '',
    helpText: '',
    id: 0,
    indicator: this.indicator
  }
  currentUrl = ''
  visibleCreate: boolean = false
  visibleEdit: boolean = false
  informationCollectionIdEdit: number = 0
  ngOnInit() {
    this.getAll()
  }
  reset() {
    this.formGroup.reset()
    this.errors = {
      name: '',
      summary: ''
    }
  }
  closeDialogCreate() {
    this.visibleCreate = false
    this.reset()
  }
  closeDialogEdit() {
    this.visibleEdit = false
    this.reset()
  }
  showDialogEdit(id: number, name: string, summary: string) {
    this.visibleEdit = true
    this.formGroup.controls.name.setValue(name)
    this.formGroup.controls.summary.setValue(summary)
    this.informationCollectionIdEdit = id
  }
  confirmationDelete(event: Event, id: number, name: string) {
    console.log('hola')
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar la colección de información <strong>${name}</strong>?`,
      header: 'Eliminar colección de información',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      accept: () => {
        this.toast.show(
          'info',
          'Eliminando..',
          'Eliminando colección de información..'
        )
        this.onDelete(id)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
  }
  getAll() {
    this.InformationCollectionService.getAll(this.paginated).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.informationCollections = res.data.items
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  onCreate() {
    if (this.formGroup.invalid) return
    const { name, summary } = this.formGroup.controls
    const informationCollection: InformationCollectionDTO = {
      name: name.value,
      summary: summary.value,
      recopilationId: 1,
      categoryId: this.category.id,
      departmentId: JSON.parse(localStorage.getItem('user')!).id as number
    }
    this.InformationCollectionService.create(informationCollection).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toast.show(
            'success',
            'Creado',
            'Colección de información creado con éxito'
          )
          this.closeDialogCreate()
          this.getAll()
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
        this.closeDialogCreate()
      }
    })
  }
  onEdit() {
    if (this.formGroup.invalid) return
    const { name, summary } = this.formGroup.controls
    const informationCollection: InformationCollectionDTO = {
      name: name.value,
      summary: summary.value,
      categoryId: this.category.id,
      recopilationId: 1,
      departmentId: JSON.parse(localStorage.getItem('user')!).id as number
    }
    this.InformationCollectionService.edit(
      this.informationCollectionIdEdit,
      informationCollection
    ).subscribe({
      next: () => {
        this.getAll()
        this.toast.show(
          'success',
          'Editado',
          'Colección de información editado con éxito'
        )
        this.closeDialogEdit()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.data.message)
        this.closeDialogEdit()
      }
    })
  }
  onDelete(id: number) {
    this.InformationCollectionService.delete(id).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Eliminado',
          'Colección de información eliminada con éxito'
        )
        this.getAll()
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  createEvidences(informationCollectionId: number) {
    this.currentRoute.url.subscribe((url) => {
      this.currentUrl = url.map((segment) => segment.path).join('/')
    })
    this.router.navigateByUrl(
      `pages/create/${this.currentUrl}/${informationCollectionId}`
    )
  }
}

type FormValues = Pick<InformationCollectionDTO, 'name' | 'summary'>
