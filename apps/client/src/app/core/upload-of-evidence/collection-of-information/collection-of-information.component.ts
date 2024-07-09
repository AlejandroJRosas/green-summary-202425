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
import { LinkEvidenceService } from '../../../services/evidence/link-evidence.service'
import {
  InformationCollectionByDepartment,
  InformationCollectionDTO,
  InformationCollectionService
} from '../../../services/information-collection.service'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { Toast } from '../../../common/toast/toast.component'
import { Category } from '../../../../shared/types/category.type'
import { Indicator } from '../../../../shared/types/indicator.type'
import { ImageModule } from 'primeng/image'
import { DividerModule } from 'primeng/divider'
import { EvidenceService } from '../../../services/evidence/evidence.service'
import { VALUES } from '../../../../../../../shared/validations'
import { DetailedRecopilation } from '../../../services/recopilation.service'
import { RecopilationService } from '../../../services/recopilation.service'
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
    ConfirmDialogModule,
    ImageModule,
    DividerModule
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
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private InformationCollectionService: InformationCollectionService,
    private LinkEvidenceService: LinkEvidenceService,
    private EvidenceService: EvidenceService,
    private RecopilationService: RecopilationService
  ) {
    const initialControlValues = {
      name: '',
      summary: ''
    }
    const validationSchema = object({
      summary: string()
        .required('La descripción es requerida')
        .max(
          VALUES.descriptionMaxAmount,
          'La descripción no puede superar los 280 caracteres'
        )
        .min(
          VALUES.descriptionMinAmount,
          'La descripción debe superar los 30 caracteres'
        ),
      name: string()
        .required('El nombre es requerido')
        .max(
          VALUES.indicatorNameAliasMaxAmount,
          'El nombre no puede superar los 40 caracteres'
        )
        .min(
          VALUES.nameAliasMinAmount,
          'El nombre debe superar un mínimo de 10 caracteres'
        )
    })
    super(initialControlValues, validationSchema)
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
    })
  }
  errors = {
    name: '',
    summary: ''
  }
  paginated = {
    first: 0,
    rows: 100
  }
  informationCollections: InformationCollectionByDepartment[] = []
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
  departmentId: number = 0
  recopilationId: number = 0
  categoryId: number = 0
  isValidDepartmentalDate: boolean = false
  detailedRecopilation: DetailedRecopilation | null = null
  currentDate = new Date()

  ngOnInit() {
    this.getDepartmentId()
    this.getAllByDepartment()
    this.getRecopilationById()
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
  getDepartmentId() {
    this.departmentId = JSON.parse(localStorage.getItem('user')!).id as number
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
  confirmationDelete(event: Event, id: number, name: string) {
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
  confirmationDeleteEvidence(event: Event, id: number, type: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar esta evidencia?`,
      header: 'Eliminar evidencia',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      accept: () => {
        this.toast.show('info', 'Eliminando..', 'Eliminando evidencia..')
        this.onDeleteEvidence(id, type)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
  }
  getRecopilationById() {
    this.RecopilationService.getById(this.recopilationId).subscribe({
      next: (res) => {
        if (res) {
          this.detailedRecopilation = res
          if (
            this.currentDate <= this.detailedRecopilation?.departmentEndDate
          ) {
            this.isValidDepartmentalDate = true
          } else {
            this.toast.show(
              'warn',
              'Cierre de Subidas de Información',
              'El periodo de subida de información ha finalizado. Ya no se podrán subir nuevas colecciones de información ni evidencias.'
            )
          }
        }
      },
      error: (e) => {
        console.error(e)
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
          console.log(res.data)
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
      recopilationId: this.recopilationId,
      categoryId: this.category.id,
      departmentId: this.departmentId
    }
    this.closeDialogCreate()
    this.InformationCollectionService.create(informationCollection).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toast.show(
            'success',
            'Creado',
            'Colección de información creado con éxito'
          )
          this.getAllByDepartment()
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
      categoryId: this.categoryId,
      recopilationId: this.recopilationId,
      departmentId: this.departmentId
    }
    this.closeDialogEdit()
    this.InformationCollectionService.edit(
      this.informationCollectionIdEdit,
      informationCollection
    ).subscribe({
      next: () => {
        this.getAllByDepartment()
        this.toast.show(
          'success',
          'Editado',
          'Colección de información editado con éxito'
        )
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
        this.getAllByDepartment()
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  onDeleteEvidence(id: number, type: string) {
    if (type === 'link') {
      this.LinkEvidenceService.delete(id).subscribe({
        next: () => {
          this.toast.show(
            'success',
            'Creado',
            'Evidencia tipo link eliminada con éxito'
          )
          this.getAllByDepartment()
        },
        error: (e) => {
          console.error(e)
          this.toast.show('error', 'Error', e.error.data.message)
        }
      })
    } else {
      this.EvidenceService.delete(id).subscribe({
        next: () => {
          this.toast.show(
            'success',
            'Creado',
            'Evidencia tipo imagen eliminada con éxito'
          )
          this.getAllByDepartment()
        },
        error: (e) => {
          console.error(e)
          this.toast.show('error', 'Error', e.error.data.message)
        }
      })
    }
  }
  createEvidences(informationCollectionId: number) {
    this.route.url.subscribe((url) => {
      this.currentUrl = url.map((segment) => segment.path).join('/')
    })
    this.router.navigateByUrl(
      `pages/create/${this.currentUrl}/information-collection/${informationCollectionId}`
    )
  }
  onEditEvidence(evidenceId: number, informationCollectionId: number) {
    this.route.url.subscribe((url) => {
      this.currentUrl = url.map((segment) => segment.path).join('/')
    })
    this.router.navigateByUrl(
      `pages/edit/${this.currentUrl}/information-collection/${informationCollectionId}/evidence/${evidenceId}`
    )
  }
}

type FormValues = Pick<InformationCollectionDTO, 'name' | 'summary'>
