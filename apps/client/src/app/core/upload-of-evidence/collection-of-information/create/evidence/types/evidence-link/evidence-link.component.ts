import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../../../../../common/validated-form-group/validated-form-group'
import { ButtonModule } from 'primeng/button'
import { string, object } from 'yup'
import { EvidenceDTO } from '../../../../../../../services/evidence/evidence.service'
import { Toast } from '../../../../../../../common/toast/toast.component'
import {
  EvidenceLinkDTO,
  LinkEvidenceService
} from '../../../../../../../services/evidence/link-evidence.service'
import { PanelModule } from 'primeng/panel'
import { VALUES } from '../../../../../../../../../../../shared/validations'
import { DataSharingEvidenceService } from '../../../../../../../services/evidence/data-sharing-evidence.service'
import { Evidence } from '../../../../../../../../shared/types/evidence.type'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'evidence-link',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule
  ],
  templateUrl: './evidence-link.component.html',
  styles: ``
})
export class EvidenceLinkComponent
  extends ValidatedFormGroup<FormValues>
  implements OnInit
{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(Toast) private toast: Toast,
    private LinkEvidenceService: LinkEvidenceService,
    private DataSharingEvidence: DataSharingEvidenceService
  ) {
    const initialControlValues = {
      description: '',
      externalLink: ''
    }
    const validationSchema = object({
      description: string()
        .required('La descripción es requerida')
        .max(
          VALUES.descriptionMaxAmount,
          'La descripción no debe superar los 280 caracteres'
        )
        .min(
          VALUES.descriptionMinAmount,
          'La descripción debe superar un mínimo de 30 caracteres'
        ),
      externalLink: string()
        .url('El formato debe ser de tipo URL')
        .required('El link es requerido')
    })
    super(initialControlValues, validationSchema)
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
    })
  }
  createdEvidence: boolean = false
  editedEvience: boolean = false
  evidenceId: number = 0
  enableEdit: boolean = false
  evidences: number[] = []
  categoryId: number = 0
  recopilationId: number = 0
  @Input() informationCollectionId: string = ''

  @Input() evidence: EvidenceEdit = {
    id: 0,
    description: '',
    externalLink: '',
    fileLink: '',
    type: 'link',
    error: '',
    collection: {
      id: 0,
      summary: '',
      name: ''
    }
  }
  @Input() index: number = 0
  @Input() edit: boolean = false
  @Output() disableSelect = new EventEmitter<boolean>()
  errors = {
    description: '',
    externalLink: ''
  }
  ngOnInit() {
    if (this.edit) {
      this.enableEdit = true
      this.createdEvidence = true
      this.evidenceId = this.evidence.id
      this.formGroup.controls.description.setValue(this.evidence.description)
      this.formGroup.controls.externalLink.setValue(
        this.evidence.externalLink ?? ''
      )
    }
  }
  enableEditButton() {
    this.enableEdit = true
    this.editedEvience = false
  }
  disableForm() {
    this.formGroup.get('description')?.disable()
    this.formGroup.get('externalLink')?.disable()
  }
  enableForm() {
    this.formGroup.get('description')?.enable()
    this.formGroup.get('externalLink')?.enable()
  }
  onCreate() {
    if (this.formGroup.invalid) return
    const { description, externalLink } = this.formGroup.controls
    const evidenceLink: EvidenceDTO = {
      description: description.value,
      error: 'error',
      type: 'link',
      externalLink: externalLink.value,
      fileLink: null,
      collectionId: this.informationCollectionId
    }
    this.LinkEvidenceService.create(evidenceLink).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toast.show(
            'success',
            'Creado',
            'Evidencia tipo link creada con éxito'
          )
          this.disableSelect.emit(true)
          this.createdEvidence = true
          this.disableForm()
          this.evidenceId = res.data.id
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
        this.createdEvidence = false
      }
    })
  }
  onEdit() {
    if (this.formGroup.invalid) return
    const { description, externalLink } = this.formGroup.controls
    const evidenceLink: EvidenceLinkDTO = {
      description: description.value,
      error: 'error',
      type: 'link',
      externalLink: externalLink.value
    }
    this.LinkEvidenceService.edit(this.evidenceId, evidenceLink).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Editado',
          'Evidencia tipo link editada con éxito'
        )
        this.editedEvience = true
        this.disableForm()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.data.message)
        this.editedEvience = false
      }
    })
  }
  onDelete() {
    this.LinkEvidenceService.delete(this.evidenceId).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Creado',
          'Evidencia tipo link eliminada con éxito'
        )
        if (this.edit) {
          this.redirect()
        }
        this.DataSharingEvidence.removeEvidence(this.index)
        this.disableSelect.emit(false)
      },
      error: (e) => {
        console.error(e)
        this.editedEvience = false
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  redirect() {
    this.router.navigateByUrl(
      `pages/information-collection/${this.recopilationId}/${this.categoryId}`
    )
  }
}

type FormValues = {
  description: string
  externalLink: string
}
type EvidenceEdit = Omit<Evidence, 'collection'> & {
  collection: {
    id: number
    name: string
    summary: string
  }
}
