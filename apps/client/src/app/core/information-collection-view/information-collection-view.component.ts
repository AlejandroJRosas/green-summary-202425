import {
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core'
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
import { Panel, PanelModule } from 'primeng/panel'
import { Category } from '../../../shared/types/category.type'
import { Indicator } from '../../../shared/types/indicator.type'
import { CategoryService } from '../../services/category.service'
import { DepartmentService } from '../../services/department.service'
import {
  DetailedRecopilation,
  RecopilationService
} from '../../services/recopilation.service'
import { User } from '../../../shared/types/user.type'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ReactiveFormsModule } from '@angular/forms'
import { EvidenceService } from '../../services/evidence/evidence.service'
import { Evidence } from '../../../shared/types/evidence.type'
import { TooltipModule } from 'primeng/tooltip'
import { ScrollTopModule } from 'primeng/scrolltop'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { ValidatedFormGroup } from '../../common/validated-form-group/validated-form-group'
import { string, object } from 'yup'
import { ChipModule } from 'primeng/chip'

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
    ReactiveFormsModule,
    TooltipModule,
    ScrollTopModule,
    OverlayPanelModule,
    ChipModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './information-collection-view.component.html',
  styles: ``
})
export class InformationCollectionViewComponent
  extends ValidatedFormGroup<ErrorForm>
  implements OnInit
{
  errors = {
    error: ''
  }
  @ViewChildren(Panel) panels: QueryList<Panel> | undefined

  allCollapsed: boolean = true

  //!DO NOT REMOVE THIS METHOD
  changed() {}

  collapseAll() {
    if (this.panels == null) return

    this.allCollapsed = true

    this.panels.forEach((panel) => {
      if (panel.collapsed) return

      panel.animating = true
      panel.collapse()
    })
  }

  expandAll() {
    if (this.panels == null) return

    this.allCollapsed = false

    this.panels.forEach((panel) => {
      if (!panel.collapsed) return

      panel.animating = true
      panel.expand()
    })
  }

  constructor(
    @Inject(Toast) private toast: Toast,
    private route: ActivatedRoute,
    private InformationCollectionService: InformationCollectionService,
    private CategoryService: CategoryService,
    private router: Router,
    private DepartmentService: DepartmentService,
    private EvidenceService: EvidenceService,
    private RecopilationService: RecopilationService
  ) {
    const initialControlValues = {
      error: ''
    }
    const validationSchema = object({
      error: string()
        .required('El error es requerido')
        .max(200, 'El error no debe superar los 200 caracteres')
        .min(2, 'El nombre debe superar un mínimo de 2 caracteres')
    })
    super(initialControlValues, validationSchema)
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
      this.departmentId = parseInt(params['departmentId'], 10)
    })
  }

  recopilationId: number = 0
  categoryId: number = 0
  departmentId: number = 0
  currentDate = new Date()
  isValidEndDate: boolean = false
  detailedRecopilation: DetailedRecopilation | null = null
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
    this.getRecopilationById()
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

  goToRecordPage() {
    this.router.navigateByUrl(
      `pages/records?recopilationId=${this.recopilationId}&indicatorId=${this.recopilationId}`
    )
  }

  confirmInformationCollection(
    name: string,
    informationCollection: InformationCollectionByDepartment
  ) {
    this.toast.show(
      'info',
      'Aprobando..',
      `Aprobando colección de información ${name}`
    )
    this.editApprovedInformationById(
      informationCollection.id,
      informationCollection
    )
  }

  editApprovedInformationById(
    informationCollectionId: number,
    informationCollection: InformationCollectionByDepartment
  ) {
    informationCollection.isApproved = true
    this.InformationCollectionService.editInformationCollectionByDepartment(
      informationCollectionId,
      informationCollection
    ).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toast.show(
            'success',
            'Aprobado',
            'Colección de información aprobada con éxito'
          )
          this.getAllByDepartment()
        }
      },
      error: (e) => {
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }

  resetError() {
    this.formGroup.reset()
    this.formGroup.controls.error.setValue('')
  }

  editEvidenceErrorById(evidence: Evidence) {
    if (this.formGroup.controls.error.value === null) return
    const formData = new FormData()
    formData.set('error', this.formGroup.controls.error.value)
    this.EvidenceService.edit(evidence.id, formData).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toast.show('success', 'Guardado', 'Error subido con éxito')
          this.resetError()
          this.getAllByDepartment()
        }
      },
      error: (e) => {
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }

  getRecopilationById() {
    this.RecopilationService.getById(this.recopilationId).subscribe({
      next: (res) => {
        if (res) {
          this.detailedRecopilation = res
          if (this.currentDate <= this.detailedRecopilation?.endDate) {
            this.isValidEndDate = true
          } else {
            this.toast.show(
              'warn',
              'Cierre de Recopilación',
              'El periodo de la recopilación ya terminó, al igual que el de subidas de información y evidencias.'
            )
          }
        }
      },
      error: (e) => {
        console.error(e)
        this.router.navigateByUrl('/404 Not Found')
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
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }
}
interface ErrorForm {
  error: string
}
